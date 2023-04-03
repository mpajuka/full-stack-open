import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([ { name: 'Arto Hellas' } ]) 
  const [newName, setNewName] = useState('')


  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      id: persons.length + 1
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`) 
    } else {
      setPersons(persons.concat(contactObject))
      setNewName('')
    }
  }

  const handleNewContact = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNewContact}/>
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