const App = (props) => {
  const {characters} = props
  let subclasses = ""
  return (
    <div>
      <h1>Characters</h1>
      <ul>{characters.map(c => 
        <li key={c.id}>
          <div>
            <p>{c.name} a level {c.level} {c.race} {c.subclass.length > 1 ? c.subclass.map(s => s + ' / ') : c.subclass.map(s => s)} </p>
            <img src={c.img} width="200" height="auto"/>
          </div>
        </li>)}</ul>
    </div>
  )
}

export default App