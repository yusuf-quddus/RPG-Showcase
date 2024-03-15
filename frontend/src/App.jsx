import { useState } from 'react'
import Character from './components/Character'

const App = ({characters}) => {
  const [chars, addCharacters] = useState(characters)
  const [name, setName] = useState('')
  const [level, setLevel] = useState('')
  const [subclass, addSubclass] = useState([])
  const [race, setRace] = useState('')
  const [campaign, setCampaign] = useState('')
  const [dead, establishLife] = useState('')
  const [story, setStory] = useState('')
  const [status, setStatus] = useState('')
  const [image, setImage] = useState('')


  const addChar = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  console.log('App works!')
  return (
    <div>
      <h1>Characters</h1>
      <form onSubmit={addChar}>
        <input />
        <button type="submit">submit</button>
      </form>
      <ul>{characters.map(c => <Character key={c.id} character={c}/>)}</ul>
    </div>
  )
}

export default App