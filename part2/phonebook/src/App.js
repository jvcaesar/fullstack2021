import React, {useState} from 'react'

const Person = ({ person }) => <div>{person.name} {person.number}</div>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterWord, setFilterWord ] = useState('')

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
      name: newName,
      number: newNumber
    }
    if (nameExists()) {
      //console.log(`${newName} exists in the array`)
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameInput = (event) => setNewName(event.target.value)

  const handleFilterInput = (event) => setFilterWord(event.target.value)

  const handleNumberInput = (event) => setNewNumber(event.target.value)

  const personsToShow = filterWord === '' ? persons : 
    persons.filter(person => person.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1)

  return (
    <div>
      <div>
        <h1>Phonebook</h1>
        filter shown with: <input value={filterWord} onChange={handleFilterInput} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App;
