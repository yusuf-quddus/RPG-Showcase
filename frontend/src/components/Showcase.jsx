import Character from './Character'
import { Link } from 'react-router-dom'

const Showcase = ({chars, user, deleteButton, characterForm, form}) => {
    return (
      <div>
        { user === null ? form() : characterForm() }
        <hr></hr>
        {chars.map(c => 
          <div key={c.id} style={{display: 'inline-block'}}>
            <Link to={`/character/${c.id}`} style={{ textDecoration: 'none' }}>
              <Character key={c.id} character={c} /> 
            </Link>
            {(user && user.username === c.username) ? deleteButton(c) : null }
          </div>)}
      </div>
    )
}

export default Showcase
