require('dotenv').config()
const express = require('express')
const app = express()
const Character = require('./models/character')

let playerChars = [
    {
        "id": 0,
        "name": "Thorin Ashar",
        "level": 14,
        "sublass": ["Sorcerer"],
        "race": "Tiefling",
        "campaign": "War of Ash and Light",
        "dead": false,
        "dtory": "Lot of things",
        "status": "Senator of Dreamoth",
        "img": "image-link"
    }, 
    {
        "id": 1,
        "name": "Levi",
        "Level": 8,
        "Class": ["Monk"],
        "Race": "Human",
        "Campaign": "Overthrone",
        "Dead": true,
        "Story": "Lot of things",
        "Status": "Died in battle",
        "img": "image-link"
    },
    {
        "id": 2,
        "name": "Levi",
        "Level": 8,
        "Class": ["Monk"],
        "Race": "Human",
        "Campaign": "Overthrone",
        "Dead": true,
        "Story": "Lot of things",
        "Status": "Died in battle",
        "img": "image-link"
    }
]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json())
app.use(requestLogger)

app.get('/api/characters', async (req, res, next) => {
    try {
        const character = await Character.find({})
        res.json(character)
    } catch (exception) {
        next(exception)
    }
})

app.get('/api/characters/:id', async (req, res, next) => {
    try {
        const pChar = await Character.findById(req.params.id)
        res.json(pChar)
    } catch (exception) {
        next(exception)
    } 
})

app.post('/api/characters', async (req, res, next) => {
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

app.delete('/api/characters/:id', async (req, res, next) => {
    try {
        await Character.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch {
        next(exception)
    }

})

app.put('/api/characters/:id', async (req, res, next) => {
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

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({error: 'malformed id'})
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({error: error.message})
    }

    next(error)
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})