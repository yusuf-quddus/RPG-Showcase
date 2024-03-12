const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Character = require('../models/character')
const assert = require('node:assert/strict')

const api = supertest(app)


const initChars = [
    {
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
]

beforeEach(async () => {
    await Character.deleteMany({})
    await new Character(initChars[0]).save()
    await new Character(initChars[1]).save()
})

test('initialized with two characters', async () => {
    const response = await api.get('/api/characters')
    assert.strictEqual(response.body.length, initChars.length)
})

test('characters are returned as JSON', async () => {
    await api.get('/api/characters').expect(200).expect('Content-Type', /application\/json/)
})

test('Thorin is in inital list of chars', async () => {
    const res = await api.get('/api/characters')
    const names = res.body.map(n => n.name)
    assert(names.includes('Thorin Ashar'))
})


after(async () => {
    await mongoose.connection.close()
})