require('dotenv').config()
const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    level: {type: String, required: true},
    subclass: [String],
    race: {type: String, required: true},
    campaign: String,
    dead: Boolean,
    story: String,
    status: String,
    img: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: String,
    publicUserName: String,
})

characterSchema.set('toJSON', {
    transform: (document, returned) => {
        returned.id = returned._id.toString()
        delete returned._id
        delete returned.__v
    }
})

const Character = mongoose.model('Character', characterSchema)
module.exports = Character