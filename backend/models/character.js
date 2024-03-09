require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => {
    console.log('connected to mongoDB')
}).catch(error => {
    console.log('error occurred in mongoDB', error.message)
})

const characterSchema = new mongoose.Schema({
    name: String,
    level: Number,
    subclass: [String],
    race: String,
    campaign: String,
    dead: Boolean,
    story: String,
    status: String,
    img: String
})

characterSchema.set('toJSON', {
    transform: (document, returned) => {
        returned.id = returnedObject._id.toString()
        delete returned._id
        delete returned.__v
    }
})

module.exports = mongoose.model('Character', characterSchema)