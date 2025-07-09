import { useEffect } from 'react'
import { useState } from 'react'
import personService from './services/persons'
import Person from './components/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newPersons, setNewPersons] = useState([])
  const [status, setStatus] = useState(null)
  const [booleanStatus, setBooleanStatus] = useState(null)
  
  useEffect(() => {
    console.log("myEffect")
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setNewPersons(response.data)
        console.log(response)
      })
  }, [])

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
        personService
            .deletePerson(id)
            .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }
  
  const changePhoneNumber = (name, number) => {
    const person = persons.find(p => p.name === name)
    const personObject = { ...person, number: number }
    personService
      .changePhoneNumber(person.id, personObject)
      .then(response => {
        setPersons(persons.map(p => p.name === name ? response.data : p))
      })
      .catch(() => {
        setBooleanStatus(false)
        setStatus(`Information of ${name} has already been removed from server`)
      })
  }

  const handleClick = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    console.log(persons)
    if (persons.some(person => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already on the phonebook`)
    } else if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} already exist! Do you want to change the phone number?`)) {
        changePhoneNumber(newName, newNumber)
        setNewName('')
        setNewNumber('')
        setBooleanStatus(true)
        setStatus(`Changed ${newName}'s number to ${newNumber}`)
      }
    } else {
      personService
      .updatePerson(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        console.log(response)
        setNewName('')
        setNewNumber('')
        setBooleanStatus(true)
        setStatus(`Added ${response.data.name}`)
      })    
      .catch(error => {
        setBooleanStatus(false)
        setStatus(error.response.data.error)
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification name={status} status={booleanStatus} />
      <form>
        <div>
          filter shown with
          <input onChange={handleSearchChange} />
        </div>
      </form>
      <div>
        <ul>
        {newPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleClick}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.name} name={person.name} id={person.id} number={person.number} deleteMyPerson={() => deletePerson(person.id, person.name)} />)}
      </ul>
    </div>
  )
}

export default App