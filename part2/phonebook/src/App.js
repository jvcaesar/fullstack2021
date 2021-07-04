import React, {useState} from 'react'

const Person = ({ person }) => <div>{person.name}</div>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const nameExists = () => {
    const found = persons.find(name => name.name === newName)
    //console.log('found: ', found)
    if (found)
      return true
    return false
  }
  const addNewName = (event) => {
    event.preventDefault()
    //console.log('addnewname: ', event.target)
    const personObject = {
      name: newName
    }
    if (nameExists()) {
      //console.log(`${newName} exists in the array`)
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  }

  const handleNameInput = (event) => {
    //console.log('namehandler: ', event.target)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App;
