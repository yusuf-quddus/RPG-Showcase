import { useState, useEffect } from 'react'
import charService from './services/characters'
import loginService from './services/login'
import userService from './services/user'
import Form from './components/Form'
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Showcase from './components/Showcase'
import Notification from './components/Notifications'
import CreateAccount from './components/CreateAccount'
import CharacterInfo from './components/CharacterInfo'
import { BrowserRouter as Router, Routes, Route } 
  from 'react-router-dom'
import { Container, Fab, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

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
  const [error, setError] = useState(false)
  const [charFormVisible, setCharFormVisible] = useState(false)

  useEffect(() => {
    charService.getAll().then(res => {
      addCharacters(res)
    })
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
    setError(true)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const displayMessage = (message) => {
    setError(false)
    setErrorMessage(message)
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
    if (username != '' && password != '' && publicName != '' && password === retypePassword) {
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
    displayMessage("logged out")
    window.localStorage.clear()
    setUser(null)
  }

  const clearForm = () => {
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
  }

  const addCharacter = async (event) => {
    event.preventDefault()

    let fullSubclassList = subclass
    if (newClass !== '') {
      fullSubclassList = subclass.concat(newClass)
    }

    setCharFormVisible(false)

    const formData = new FormData()

    formData.append("name", name)
    formData.append("level", level)
    formData.append("subclass", fullSubclassList)
    formData.append("race", race)
    formData.append("campaign", campaign)
    formData.append("dead", dead)
    formData.append("story", story)
    formData.append("status", status)
    formData.append("photo", image)
    formData.append("username", user.username)
    formData.append("publicUserName", user.name)

    try {
      const res = await charService.createCharacter(formData)
      displayMessage("Player character successfully posted")
      addCharacters(chars.concat(res))
      clearForm()
    } catch (error) {
      if (name === '') {
        displayErrorMessage("Name Missing")
      } else if (image === '') {
        displayErrorMessage("Image Missing")
      } else {
        displayErrorMessage("Missing Fields")
      }
    }
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
      <Form name={name} level={level} race={race}
            newClass={newClass} campaign={campaign} dead={dead} story={story}
            status={status} image={image} subclasses={subclass} addCharacter={addCharacter} 
            handleAddSubclass={handleAddSubclass} setName={setName} 
            setLevel={setLevel} setRace={setRace} setSubclass={setSubclass}
            setCampaign={setCampaign} establishLife={establishLife} 
            setStory={setStory} setStatus={setStatus} setImage={setImage} 
            clearForm={clearForm} setCharFormVisible={setCharFormVisible}
      />
  )

  const hiddenFormButton = () => (
    <div className='form_button'>
      <Fab color="primary" aria-label="edit" onClick={() => setCharFormVisible(true)}>
        <EditIcon />
      </Fab>
    </div>
  )

  const characterFormHidden = () => (
    <div>
      {charFormVisible ? characterForm() : hiddenFormButton()}
    </div>
  )
  

  const deleteButton = (character, navigate) => (
    <Button variant="outlined" color="error" onClick={() => 
      {
        deleteCharacter(character.id)
        if (navigate) {
          navigate('/')
        }
      }}> Delete </Button>
  )

  const accountForm = () => (
    <div> {createAccount ? createAccountForm() : loginForm()} </div>
  )

  return (
    <Container>
        <Header user={user} onClick={handleLogout}/>
        <Router>
          <div>
            <Notification message={errorMessage} error={error}/>
          </div>
          <Routes>
            <Route path="/" element={<Showcase chars={chars} user={user} 
                   deleteButton={deleteButton} characterForm={characterFormHidden} form={accountForm}/>} />
            <Route path="/character/:id" element={<CharacterInfo characters={chars} 
                   user={user} deleteButton={deleteButton}/>}/>
          </Routes>
        </Router>
        <Footer />
    </Container>
  )
}

export default App