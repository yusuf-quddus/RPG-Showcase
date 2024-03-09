require('dotenv').config()
const express = require('express')
const app = express()
const Character = require('./models/character')

let playerChars = [
    {
        "id": 0,
        "name": "Thorin Ashar",
        "Level": 14,
        "Class": ["Sorcerer"],
        "Race": "Tiefling",
        "Campaign": "War of Ash and Light",
        "Dead": false,
        "Story": "Lot of things",
        "Status": "Senator of Dreamoth",
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

app.get('/api/characters', async (req, res) => {
    const character = await Character.find({})
    res.json(character)
})

app.get('/api/characters/:id', (req, res) => {
    const id = Number(req.params.id)
    const pChar = playerChars.find(p => p.id === id)
    if (pChar) {
        res.json(pChar)
    } else {
        res.status(404).end()
    }
})

app.post('/api/characters', async (req, res) => {
    const body = req.body
    // add error handling for missing fields
})

app.delete('/api/characters/:id', (req, res) => {
    const id = Number(req.params.id)
    playerChars = playerChars.filter(p => p.id !== id)
    res.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})