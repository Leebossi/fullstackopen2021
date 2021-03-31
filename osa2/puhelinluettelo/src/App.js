import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(person => person.name === newName)
    console.log(existingPerson)
    console.log(nameObject)

    if (persons.filter(person => person.name === nameObject.name).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number '${existingPerson.number}' with '${nameObject.number}'?`)) {
        personService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(updated => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updated))
            setNewName('')
            setNewNumber('')
            setNotification({ message: `Updated ${newName} with number ${nameObject.number}`, type: 'success' })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setPersons(persons.filter(n => n.name !== newName))
            setNotification({ message: `Information of ${newName} has already been removed from server`, type: 'error' })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({ message: `Added ${returnedPerson.name}`, type: 'success' })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }


  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      personService
        .eradicate(person.id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== person.id))
          setNotification({ message: `Deleted ${person.name}`, type: 'success' })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
  }

  const personsToShow =
    persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />
      <Filter filter={newFilter} handleChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm newName={newName} newNumber={newNumber} persons={persons} addPerson={addPerson}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )

}

export default App