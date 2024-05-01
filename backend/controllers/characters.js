const characterRouter = require('express').Router()
const Character = require('../models/character')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
let path = require('path')

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

const getToken = (auth) => {
    if (auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '')
    } 
    return null
}

const storage = multer.memoryStorage({})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

let upload = multer({ storage: storage, fileFilter: fileFilter });


characterRouter.get('/', async (req, res, next) => {
    const characters = await Character.find({})

    for (character of characters) {
        const getObjectParams = {
            Bucket: bucketName,
            Key: character.img
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        character.img = url
        console.log(url)
    }

    res.status(200).json(characters)
})

characterRouter.get('/:id', async (req, res, next) => {
    const pChar = await Character.findById(req.params.id)
    res.status(200).json(pChar)
})

characterRouter.post('/', upload.single('photo'), async (req, res, next) => {
    const body = req.body
    const verifiedToken = jwt.verify(getToken(req.get('authorization')), process.env.SECRET)
    if (!verifiedToken.id) {
        return res.status(401).json({ error: 'invalid token!' })
    }
    const user = await User.findById(verifiedToken.id)

    const imageFileName = uuidv4() + '-' + Date.now() + path.extname(req.file.originalname)
    
    const imageS3Params = {
        Bucket: bucketName,
        Key: imageFileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    } 

    const command = new PutObjectCommand(imageS3Params)

    await s3.send(command)

    const character = new Character({
        name: body.name,
        level: body.level,
        subclass: body.subclass,
        race: body.race,
        campaign: body.campaign,
        dead: body.dead || false,
        story: body.story,
        status: body.status,
        img: imageFileName,
        user: user.id,
        username: user.username,
        publicUserName: user.name
    })    
    
    try {
        const postedCharacter = await character.save()
        user.characters = user.characters.concat(postedCharacter._id)
        await user.save()   
        res.status(201).json(postedCharacter)
    } catch (error) {
        throw error
    }
})

characterRouter.delete('/:id', async (req, res, next) => {   
    const deletedCharacter = await Character.findById(req.params.id)
    const params = {
        Bucket: bucketName,
        Key: deletedCharacter.img
    }
    const command = new DeleteObjectCommand(params)
    await s3.send(command)
    await Character.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

characterRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    const character = {
        name: body.name,
        level: body.level,
        subclass: body.subclass,
        race: body.race,
        campaign: body.campaign,
        dead: body.dead || false,
        story: body.story,
        status: body.status,
        img: body.img
    }

    const updated = await Character.findByIdAndUpdate(req.params.id, character, {new: true})
    res.json(updated)
})

module.exports = characterRouter