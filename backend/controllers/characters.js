const characterRouter = require('express').Router()
const Character = require('../models/character')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = (auth) => {
    console.log(auth)
    console.log(auth.startsWith('Bearer '))
    console.log(auth && auth.startsWith('Bearer '))
    if (auth && auth.startsWith('Bearer ')) {
        console.log('true')
        return auth.replace('Bearer ', '')
    } else {
        console.log('false')
        return null
    }
}

characterRouter.get('/', async (req, res, next) => {
    const character = await Character.find({})
    res.status(200).json(character)
})

characterRouter.get('/:id', async (req, res, next) => {
    const pChar = await Character.findById(req.params.id)
    res.status(200).json(pChar)
})

characterRouter.post('/', async (req, res, next) => {
    const body = req.body
    const verifiedToken = jwt.verify(getToken(req.get('authorization')), process.env.SECRET)
    if (!verifiedToken.id) {
        return res.status(401).json({ error: 'invalid token!' })
    }
    const user = await User.findById(verifiedToken.id)

    // add error handling for missing fields
    const character = new Character({
        name: body.name,
        level: body.level,
        subclass: body.subclass,
        race: body.race,
        campaign: body.campaign,
        dead: body.dead || false,
        story: body.story,
        status: body.status,
        img: body.img,
        user: user.id,
        username: user.username,
        publicUserName: user.name
    })    
    
    const postedCharacter = await character.save()
    user.characters = user.characters.concat(postedCharacter._id)
    await user.save()

    res.status(201).json(postedCharacter)
})

characterRouter.delete('/:id', async (req, res, next) => {   
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