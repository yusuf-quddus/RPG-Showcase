const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: String,
    passwordHash: String,
    characters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Character'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
        delete returnedObject.username
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User