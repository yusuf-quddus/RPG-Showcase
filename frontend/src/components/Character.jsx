const Character = ({character}) => {
    return (
      <li key={character.id}>
        <div>
          <p>{character.name} a level {character.level} {character.race} {character.subclass.length > 1 ? 
              character.subclass.map(s => s + '  ') : 
              character.subclass.map(s => s)} 
          </p>
          <p><i>by {character.publicUserName}</i></p>
         {console.log(`../../../backend/images/${character.img}`)}
          <img src={`../images/${character.img}`} width="200" height="auto" alt="test"/>
        </div>
      </li>
    )
}

export default Character
