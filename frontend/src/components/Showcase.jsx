import Character from './Character'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const Showcase = ({chars, user, deleteButton, characterForm, form}) => {
    return (
      <div>
        <div id="site-description">
          <Typography variant="p">Welcome to RPG Showcase! 
            From D&D to Pathfinder, immortalize your ttrpg character. </Typography>
        </div>
        <br></br>
        { user === null ? form() : characterForm() }
        <hr></hr>
        {chars.map(c => 
          <div key={c.id} style={{display: 'inline-block'}}>
            <Link to={`/character/${c.id}`} style={{ textDecoration: 'none' }}>
              <Character key={c.id} character={c} /> 
            </Link>
            {(user && user.id === c.user) ? deleteButton(c) : null }
          </div>)}
      </div>
    )
}

export default Showcase
