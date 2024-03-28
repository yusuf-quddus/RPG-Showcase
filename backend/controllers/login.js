const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    console.log(password, user.passwordHash)
    const correct = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!correct) {
        return res.status(401).json({error: 'invalid username or password'})
    }

    const tokensUser = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(tokensUser, process.env.SECRET, {expiresIn: 3600})
    
    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter