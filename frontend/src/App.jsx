import { useState, useEffect } from 'react'
import charService from './services/characters'
import Character from './components/Character'
import Input from './components/Input'

const App = () => {
  const [chars, addCharacters] = useState([])
  const [name, setName] = useState('')
  const [level, setLevel] = useState(1)
  const [subclass, addSubclass] = useState([])
  const [newClass, setSubclass] = useState('')
  const [race, setRace] = useState('')
  const [campaign, setCampaign] = useState('')
  const [dead, establishLife] = useState(false)
  const [story, setStory] = useState('')
  const [status, setStatus] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    charService.getAll().then(res => addCharacters(res))
  }, [])

  const addCharacter = (event) => {
    event.preventDefault()
    if (newClass !== '') {
      handleAddSubclass()
    }
    console.log('button clicked', event.target)
    const charObj = {
      id: chars.length + 1,
      name: name,
      level: level,
      subclass: subclass,
      race: race,
      campaign: campaign,
      dead: dead,
      story: story,
      status: status,
      img: image,
    }
    charService.createCharacter(charObj).then(res => {
      addCharacters(chars.concat(res))
      setName('')
      setLevel(1)
      setSubclass('')
      setRace('')
      setCampaign('')
      establishLife(false)
      setStory('')
      setStatus('')
      setImage('')
    })
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleSetLevel = (event) => {
    setLevel(event.target.value)
  }

  const handleNewSubclass = (event) => {
    setSubclass(event.target.value)
  }

  const handleNewRace = (event) => {
    setRace(event.target.value)
  }

  const handleCampaign = (event) => {
    setCampaign(event.target.value)
  }

  const handleStory = (event) => {
    setStory(event.target.value)
  }

  const handleStatus = (event) => {
    setStatus(event.target.value)
  }

  const handleNewImage = (event) => {
    setImage(event.target.value)
  }

  const handleDeath = (event) => {
    establishLife(event.target.checked)
    console.log(event.target.checked)
  }

  const handleAddSubclass = (event) => {
    const allSubclasses = subclass.concat(event)
    console.log(allSubclasses)
    setSubclass('')
    addSubclass(allSubclasses)
  }

  return (
    <div>
      <h1>Characters</h1>
      <fieldset>
        <legend>Input Character Information</legend>
      <form onSubmit={addCharacter}>
        <Input value={name} func={handleNameChange} label="Name: "/>
        <Input value={level} func={handleSetLevel} label="Level: " type="range"/>
        <Input value={newClass} func={handleNewSubclass} label="Class: "/>
        <button type="button" onClick={() => handleAddSubclass(newClass)}>add subclass</button>
        <Input value={race} func={handleNewRace} label="Race: "/>
        <Input value={campaign} func={handleCampaign} label="Campaign: "/>
        <Input value={dead} func={handleDeath} label="Is dead?: " type="checkbox"/>
        <Input value={story} func={handleStory} label="Story: " type="area"/>
        <Input value={status} func={handleStatus} label="Status: " type="area"/>
        <Input value={image} func={handleNewImage} label="Image Link: "/>
        <button type="submit">submit</button>
      </form>
      </fieldset>
      <ul>{chars.map(c => <Character key={c.id} character={c}/>)}</ul>
    </div>
  )
}

export default App