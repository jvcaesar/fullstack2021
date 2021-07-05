import React, {useState} from 'react'

const Person = ({ person }) => <div>{person.name} {person.number}</div>

const Filter = ({ value, handler }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={handler} />
    </div>
  )
}

const PersonForm = ({ handleSubmit, newName, nameHandler, newNumber, numberHandler}) => {
  return (
    <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={nameHandler} />
    </div>
    <div>
      number: <input value={newNumber} onChange={numberHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({ persons, filterWord }) => {
  const personsToShow = filterWord === '' ? persons : 
    persons.filter(person => person.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1)
  return (
    <div>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}


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

  return (
    <div>

      <h1>Phonebook</h1>

      <Filter value={filterWord} handler={handleFilterInput} />

      <h2>add a new</h2>

      <PersonForm handleSubmit={addNewName} 
          newName={newName} nameHandler={handleNameInput}
          newNumber={newNumber} numberHandler={handleNumberInput} 
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filterWord={filterWord} />

    </div>
  )
}

export default App;
