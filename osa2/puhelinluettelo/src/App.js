import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
       name: 'Arto Hellas',
       number: '040-1231244'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.name} person={person} /> 
        )}
      </div>
    </div>
  )

}

export default App