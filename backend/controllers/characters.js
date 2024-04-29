const characterRouter = require('express').Router()
const Character = require('../models/character')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const { promisify } = require('util')
let path = require('path')

const getToken = (auth) => {
    if (auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '')
    } 
    return null
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

let upload = multer({ storage: storage, fileFilter: fileFilter });

const unlinkAsync = promisify(fs.unlink)

characterRouter.get('/', async (req, res, next) => {
    const character = await Character.find({})
    res.status(200).json(character)
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

    const character = new Character({
        name: body.name,
        level: body.level,
        subclass: body.subclass,
        race: body.race,
        campaign: body.campaign,
        dead: body.dead || false,
        story: body.story,
        status: body.status,
        img: req.file.filename,
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
        await unlinkAsync(`../frontend/public/images/${req.file.filename}`)
        throw error
    }
})

characterRouter.delete('/:id', async (req, res, next) => {   
    const deletedCharacter = await Character.findById(req.params.id)
    await Character.findByIdAndDelete(req.params.id)
    await unlinkAsync(`../frontend/public/images/${deletedCharacter.img}`)
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