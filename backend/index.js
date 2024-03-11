const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

let playerChars = [
    {
        "id": 0,
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
        "id": 1,
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
    {
        "id": 2,
        "name": "Levi",
        "Level": 8,
        "Class": ["Monk"],
        "Race": "Human",
        "Campaign": "Overthrone",
        "Dead": true,
        "Story": "Lot of things",
        "Status": "Died in battle",
        "img": "image-link"
    }
]