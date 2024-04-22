import Character from './Character'
import { Link } from 'react-router-dom'

const Showcase = ({chars, user, deleteButton, characterForm, form}) => {
    return (
      <div>
        <h1>RPG Showcase</h1>
        { user === null ? form() : characterForm() }
        <ul>{chars.map(c => 
          <div key={c.id} style={{display: 'inline-block'}}>
            <Link to={`/character/${c.id}`}>
              <Character key={c.id} character={c} /> 
            </Link>
            {(user && user.username === c.username) ? deleteButton(c) : null }
          </div>)}
        </ul>
      </div>
    )
}

export default Showcase
