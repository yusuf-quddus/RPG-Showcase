import Character from './Character'

const Showcase = ({chars, user, deleteButton}) => {
    return (
      <ul>{chars.map(c => 
        <div key={c.id} style={{display: 'inline-block'}}>
            <Character key={c.id} character={c} /> 
            {(user && user.username === c.username) ? deleteButton(c) : null }
        </div>)}
      </ul>
    )
}

export default Showcase
