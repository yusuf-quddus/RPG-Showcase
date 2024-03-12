const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert/strict')
const Character = require('../models/character')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Character.deleteMany({})
    await new Character(helper.initChars[0]).save()
    await new Character(helper.initChars[1]).save()
})

test('initialized with two characters', async () => {
    const response = await api.get('/api/characters')
    assert.strictEqual(response.body.length, helper.initChars.length)
})

test('characters are returned as JSON', async () => {
    await api.get('/api/characters').expect(200).expect('Content-Type', /application\/json/)
})

test('Thorin is in inital list of chars', async () => {
    const res = await api.get('/api/characters')
    const names = res.body.map(n => n.name)
    assert(names.includes('Thorin Ashar'))
})

test('can add a character', async () => {
    await api.post('/api/characters')
             .send(helper.newChar)
             .expect(201)
             .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/characters')
    const names = res.body.map(n => n.name)
    assert.strictEqual(res.body.length, helper.initChars.length + 1)
    assert(names.includes('Boblin'))
})

test('cannot add characters without a name', async () => {
    await api.post('/api/characters')
             .send(helper.incorrectChar)
             .expect(400)
             .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/characters')
    assert.strictEqual(res.body.length, helper.initChars.length)
})


after(async () => {
    await mongoose.connection.close()
})