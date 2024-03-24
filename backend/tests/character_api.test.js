const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert/strict')
const Character = require('../models/character')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('basic testing characters api: ', () => {
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
})

describe('Basic testing for one user: ', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('secretz', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })
  
    test('created user', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
            username: 'yquddus',
            name: 'Yusuf Quddus',
            password: 'secretp@ssWord',
        }
  
        await api.post('/api/users').send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
  
        const usersAtEnd = await helper.usersInDb()

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    })

    test('creation fails properly from already claimed username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'supersecretpassword',
        }
    
        const result = await api.post('/api/users').send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        assert(result.body.error.includes('expected `username` to be unique'))
    
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
})

after(async () => {
    await mongoose.connection.close()
})