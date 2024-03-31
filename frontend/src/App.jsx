import { useState, useEffect } from 'react'
import charService from './services/characters'
import loginService from './services/login'
import Character from './components/Character'
import Input from './components/Input'
import Login from './components/Login'
import Notification from './components/Notifications'

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
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    charService.getAll().then(res => addCharacters(res))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({username, password})
      setUser(loginUser)
      setUserName('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addCharacter = (event) => {
    event.preventDefault()
    let fullSubclassList = subclass
    if (newClass !== '') {
      fullSubclassList = subclass.concat(newClass)
    }
    const charObj = {
      name: name,
      level: level,
      subclass: fullSubclassList,
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
      addSubclass([])
    })
  }

  const handleAddSubclass = (event) => {
    const allSubclasses = subclass.concat(event)
    addSubclass(allSubclasses)
    setSubclass('')
  }

  const deleteCharacter = (id) => {
    charService.deleteCharacter(id).then(res => {
      const remainingChars = chars.filter(c => c.id !== id)
      addCharacters(remainingChars)
    })
  }

  const loginForm = () => (
    <Login loginHandler={handleLogin} 
           username={username} 
           password={password} 
           onChangeUser={setUserName} 
           onChangePass={setPassword}/>
  )

  const characterForm = () => (
    <fieldset>
      <legend>Input Character Information</legend>
      <form onSubmit={addCharacter}>
        <Input value={name} func={setName} label="Name: "/>
        <Input value={level} func={setLevel} label="Level: " type="range"/>
        <Input value={newClass} func={setSubclass} label="Class: "/>
        <button type="button" onClick={() => handleAddSubclass(newClass)}>add subclass</button>
        <Input value={race} func={setRace} label="Race: "/>
        <Input value={campaign} func={setCampaign} label="Campaign: "/>
        <Input value={dead} func={establishLife} label="Is dead?: " type="checkbox"/>
        <Input value={story} func={setStory} label="Story: " type="area"/>
        <Input value={status} func={setStatus} label="Status: " type="area"/>
        <Input value={image} func={setImage} label="Image Link: "/>
        <button type="submit">submit</button>
        </form>
    </fieldset>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      <h1>Characters</h1>
      { user === null ? loginForm() : 
        <div> {user.name} {characterForm()} </div>
      }
      <ul>{chars.map(c => 
        <div key={c.id}>
            <Character key={c.id} character={c}/> 
            <button type="button" onClick={() => deleteCharacter(c.id)}>delete</button>
        </div>)}
      </ul>
    </div>
  )
}

export default App