import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')


  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`) 
    } else {
      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
    }
  }


  const handleNewName = (event) => {
    setNewName(event.target.value)
  }


  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }


  const handleNewFilter = (event) => {
    setNameFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={nameFilter} eventHandler={handleNewFilter} />

      <h3>add a new</h3>

      <PersonForm addContact={addContact}
        name={newName} 
        number={newNumber} 
        nameHandler={handleNewName} 
        numberHandler={handleNewNumber} 
      />

      <h3>Numbers</h3>

      <Persons key={persons.name} persons={persons} nameFilter={nameFilter}/>
    </div>
  )
}

export default App