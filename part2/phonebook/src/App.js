import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

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

const deletePerson = (id, name, setAllPersons) => {
  //console.log(`Delete ${id}`)
  if (window.confirm(`Delete ${name}?`)) {
    personService.removePerson(id)
      .then(response => setAllPersons())
      console.log(`${name} deleted.`)
  } else {
    console.log(`${name} not deleted.`)
  }
}

const Persons = ({ persons, filterWord, setAllPersons }) => {
  const personsToShow = filterWord === '' ? persons : 
    persons.filter(person => person.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1)
  return (
    <div>
      {personsToShow.map(person => 
        <Person key={person.name} person={person} 
        deletePerson={() => deletePerson(person.id, person.name, setAllPersons)} />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterWord, setFilterWord ] = useState('')

  const getAllPersons = () => {
    personService.getAll()
      .then(response => setPersons(response))
  }

  useEffect(getAllPersons, [])

  const nameExists = () => {
    const found = persons.find(name => name.name === newName)
    
    if (found) {
      console.log(`Found ${found.name} ${found.id}`)
      return found.id
    }
    return false
  }

  const addNewName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const nameFound = nameExists()
    if (nameFound && 
      window.confirm(`${newName} is already added to phonebook. Replace old number with new one?`)) {
      //alert(`${newName} is already added to phonebook`)
      personService.updatePerson(nameFound, personObject)
        .then(updatedPerson =>setPersons(persons.map(person => person.id !== nameFound ? person : updatedPerson)) )
    } else if (!nameFound) {
      personService.createPerson(personObject)
        .then(response => setPersons(persons.concat(response)))
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

      <Persons persons={persons} filterWord={filterWord} setAllPersons={getAllPersons}/>

    </div>
  )
}

export default App;
