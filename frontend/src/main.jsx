import ReactDOM from 'react-dom/client'

import App from './App'

const characters = [
  {
      "id": 0,
      "name": "Thorin Ashar",
      "level": 14,
      "subclass": ["Sorcerer"],
      "race": "Tiefling",
      "campaign": "War of Ash and Light",
      "dead": false,
      "story": "Lot of things",
      "status": "Senator of Dreamoth",
      "img": "https://i.redd.it/ictrl01j95201.jpg"
  }, 
  {
      "id": 1,
      "name": "Levi",
      "level": 8,
      "subclass": ["Monk", "Rogue"],
      "race": "Human",
      "campaign": "Overthrone",
      "dead": true,
      "story": "Lot of things",
      "status": "Died in battle",
      "img": "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/04/featured-image-1710x9001.png"
  },
  {
      "id": 2,
      "name": "Levi",
      "level": 8,
      "subclass": ["Monk"],
      "race": "Human",
      "campaign": "Overthrone",
      "dead": true,
      "story": "Lot of things",
      "status": "Died in battle",
      "img": "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/04/featured-image-1710x9001.png"
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(<App characters = {characters}/>)