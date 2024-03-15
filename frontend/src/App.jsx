import Character from './components/Character'

const App = ({characters}) => {
  console.log('App works!')
  return (
    <div>
      <h1>Characters</h1>
      <ul>{characters.map(c => <Character key={c.id} character={c}/>)}</ul>
    </div>
  )
}

export default App