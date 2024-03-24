const Character = require('../models/character')
const User = require('../models/user')

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

const newChar = {
    "name": "Boblin",
    "level": 1,
    "sublass": ["Rogue"],
    "race": "Goblin",
    "campaign": "War of Ash and Light",
    "dead": false,
    "dtory": "Lot of things",
    "status": "Senator of Dreamoth",
    "img": "image-link"
}

const incorrectChar = {
    "level": 1,
    "sublass": ["Rogue"],
    "race": "Goblin",
    "campaign": "War of Ash and Light",
    "dead": false,
    "dtory": "Lot of things",
    "status": "Senator of Dreamoth",
    "img": "image-link"
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {initChars, newChar, incorrectChar, usersInDb}