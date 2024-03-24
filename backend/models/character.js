require('dotenv').config()
const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    level: Number,
    subclass: [String],
    race: String,
    campaign: String,
    dead: Boolean,
    story: String,
    status: String,
    img: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
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