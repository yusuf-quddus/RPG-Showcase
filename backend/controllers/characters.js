const characterRouter = require('express').Router()
const Character = require('../models/character')

characterRouter.get('/', async (req, res, next) => {
    try {
        const character = await Character.find({})
        res.json(character)
    } catch (exception) {
        next(exception)
    }
})

characterRouter.get('/:id', async (req, res, next) => {
    try {
        const pChar = await Character.findById(req.params.id)
        res.json(pChar)
    } catch (exception) {
        next(exception)
    } 
})

characterRouter.post('/', async (req, res, next) => {
    const body = req.body
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
        img: body.img
    })
    try {
        const postedCharacter = await character.save(character)
        res.json(postedCharacter)
    } catch (exception) {
        next(exception)
    }
})

characterRouter.delete('/:id', async (req, res, next) => {
    try {
        await Character.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch {
        next(exception)
    }

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

    try {
        const updated = await Character.findByIdAndUpdate(req.params.id, character, {new: true})
        res.json(updated)
    } catch {
        next(exception)
    }
})

module.exports = characterRouter