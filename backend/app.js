const express = require('express')
const app = express()
require('express-async-errors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const characterRouter = require('./controllers/characters')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI).then(result => {
    logger.info('connected to mongoDB')
}).catch(error => {
    logger.error('error occurred in mongoDB', error.message)
})

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/characters', characterRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app