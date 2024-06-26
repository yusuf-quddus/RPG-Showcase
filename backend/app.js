const express = require('express')
const app = express()
require('express-async-errors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const characterRouter = require('./controllers/characters')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const cors = require('cors')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI).then(result => {
    logger.info('connected to mongoDB')
}).catch(error => {
    logger.error('error occurred in mongoDB', error.message)
})

app.use(express.json())
app.use(middleware.requestLogger)

app.use(cors())

app.use('/api/characters', characterRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(express.static('dist'))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app