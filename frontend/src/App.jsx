import { useState, useEffect } from 'react'
import charService from './services/characters'
import loginService from './services/login'
import userService from './services/user'
import Input from './components/Input'
import Login from './components/Login'
import Showcase from './components/Showcase'
import Notification from './components/Notifications'
import CreateAccount from './components/CreateAccount'

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
  const [publicName, setPublicName] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [createAccount, setCreateAccount] = useState(false)

  useEffect(() => {
    charService.getAll().then(res => addCharacters(res))
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      charService.setToken(user.token)
    }
  }, [])

  const displayErrorMessage = (message) => {
    setErrorMessage(message, true)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // will later differentiate error vs non-error notifications
  const displayMessage = (message) => {
    setErrorMessage(message, false)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({username, password})
      window.localStorage.setItem('loggedInUser', JSON.stringify(loginUser)) 
      charService.setToken(loginUser.token)
      setUser(loginUser)
      setUserName('')
      setPassword('')
      displayMessage("logged in")
    } catch (error) {
      displayErrorMessage('Username or password is incorrect')
    }
  }

  const handleLoginSwitch = () => {
    setUserName('')
    setPublicName('')
    setPassword('')
    setRetypePassword('')
    setCreateAccount(!createAccount)
  }

  const handleCreateAccount = async event => {
    event.preventDefault()
    if (username != '' && password != '' && username == '' && password === retypePassword) {
      try {
        const name = publicName
        await userService.registerAccount({username, name, password})
        handleLoginSwitch()
        displayMessage('Your account has been created, please sign in')
      } catch (error) {
        displayErrorMessage(`The username "${username}" is already taken`)
      }
    } else if (password !== retypePassword) {
      displayErrorMessage('Passwords do not match')
    } else {
      displayErrorMessage('Missing fields')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
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
      username: user.username,
      publicUserName: user.name
    }

    charService.createCharacter(charObj).then(res => {
      displayMessage("Player character successfully posted")
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
           onChangePass={setPassword}
           onClickCreateAccount={handleLoginSwitch}/>
  )

  const createAccountForm = () => (
    <CreateAccount 
      onClick={handleCreateAccount} 
      username={username}
      password={password}
      retype={retypePassword}
      publicName={publicName}
      onChangeUser={setUserName} 
      onChangePass={setPassword} 
      onChangeRetype={setRetypePassword}
      onChangePubName={setPublicName}
      onClickCancel={handleLoginSwitch}/>
  )

  const characterForm = () => (
    <div>
      Signed in as {user.name}
      <fieldset>
        <legend>Input Character Information</legend>
        <form onSubmit={addCharacter}>
          <Input value={name} func={setName} label="Name: "/>
          <Input value={level} func={setLevel} label="Level: " type="range"/>
          <Input value={race} func={setRace} label="Race: "/>
          <Input value={newClass} func={setSubclass} label="Class: "/>
          <button type="button" onClick={() => handleAddSubclass(newClass)}>add subclass</button>
          <Input value={campaign} func={setCampaign} label="Campaign: "/>
          <Input value={dead} func={establishLife} label="Is dead?: " type="checkbox"/>
          <Input value={story} func={setStory} label="Story: " type="area"/>
          <Input value={status} func={setStatus} label="Status: " type="area"/>
          <Input value={image} func={setImage} label="Image Link: "/>
          <br></br>
          <button type="submit">submit</button>
        </form>
      </fieldset>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

  const deleteButton = (character) => (
    <button type="button" onClick={() => deleteCharacter(character.id)}>delete</button>
  )

  const form = () => (
    <div> {createAccount ? createAccountForm() : loginForm()} </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      <h1>RPG Showcase</h1>
      { user === null ? form() : characterForm() }
      <Showcase chars={chars} user={user} deleteButton={deleteButton}/>
    </div>
  )
}

export default App