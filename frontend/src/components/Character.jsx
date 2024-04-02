const Character = ({character}) => {
    return (
      <li key={character.id}>
        <div>
          <p>{character.name} a level {character.level} {character.race} {character.subclass.length > 1 ? 
              character.subclass.map(s => s + '  ') : 
              character.subclass.map(s => s)} 
          </p>
          <p><i>by {character.publicUserName}</i></p>
          <img src={character.img} width="200" height="auto"/>
        </div>
      </li>
    )
}

export default Character
