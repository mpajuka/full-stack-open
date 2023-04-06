import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber,
    }
    const personInContacts = persons.find(person => person.name === newName)

    if (personInContacts) {
      if (window.confirm(`${newName} is already added to phonebook\nDo you want to update the old number with the new one?`)) {
        const personWithUpdatedNumber = {...personInContacts, number: newNumber} 
        personService
          .changeNumber(personWithUpdatedNumber)
          .then(response => {
            setPersons(persons.map(p => p.id === personWithUpdatedNumber.id ? response : p))
          })
          setNewName('')
          setNewNumber('')
      }
    } else {
      personService
        .create(contactObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      
    }
  }


  const deleteContact = (person) => {
      const deletedContact = person
      if (window.confirm(`Delete ${deletedContact.name}`)) {
        personService
          .deleteContact(person)
          setPersons(persons.filter(p => p.id !== deletedContact.id))
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

      <Persons key={persons.name} persons={persons} nameFilter={nameFilter} handleDeleteContact={deleteContact} />
    </div>
  )
}

export default App