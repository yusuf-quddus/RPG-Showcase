import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@mui/material"
import { useEffect } from 'react'

const CharacterInfo = ({characters, user, deleteButton}) => {
    const navigate = useNavigate() 
    const id = useParams().id
    const character = characters.find(c => c.id === id)

    useEffect(() => {
        if (character == null) {
            navigate('/')
        }
      }, []);

    if (character == null) return 
    return (
        <div>
            <h1 className='color-primary'>{character.name} {character.dead ? (' (RIP)') : null}</h1>
            <h3>The level {character.level} {character.race} {character.subclass.map(s => ' ' + s)}</h3>
            <h4><b>Campaign</b>: {character.campaign}</h4>
            <p><b>Backstory:</b> {character.story === '' ? (<i>[Backstory not provided]</i>) : character.story}</p>
            <p><b>Status:</b> {character.status === '' ? (<i>[Status not provided]</i>) : character.status}</p>
            <div className='account_form'>
            <img src={`${character.img}`} width="200" height="auto" alt="test"/>
            <div>
            {(user && user.id === character.user) ? deleteButton(character, navigate) : null }
            </div>
            </div>
            <Button variant="outlined" onClick={() => navigate('/')}>Back</Button>
            <p><i>Posted by {character.publicUserName}</i></p>
        </div>
    )
}

export default CharacterInfo