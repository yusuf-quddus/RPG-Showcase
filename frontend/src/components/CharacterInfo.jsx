import { useParams, useNavigate } from 'react-router-dom'

const CharacterInfo = ({characters, user, deleteButton}) => {
    const id = useParams().id
    const character = characters.find(c => c.id === id)
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate('/')}>Back</button>
            <h1>{character.name}</h1>
            <p>{character.publicUserName}</p>
            <p>{character.story}</p>
            <img src={`/images/${character.img}`} width="200" height="auto" alt="test"/>
            {(user && user.username === character.username) ? deleteButton(character, navigate) : null }
        </div>
    )
}

export default CharacterInfo