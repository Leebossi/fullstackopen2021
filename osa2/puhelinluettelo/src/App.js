import React, { useState, useEffect } from 'react'
import axios from 'axios'


const PersonForm = (props) => {
  
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: props.newName,
      number: props.newNumber
      }

      if (props.persons.filter(person => person.name === nameObject.name).length > 0) {
        alert(`${props.newName} is already added to phonebook`)
        props.setNewName('')
        props.setNewNumber('')
        return
      }
      
      props.setPersons(props.persons.concat(nameObject))
      props.setNewName('')
      props.setNewNumber('')
    }

    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNameChange}
            />
        </div>
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Filter = ( props ) => {
  return (
    <div>
    filter shown with <input
      value={props.filter}
      onChange={props.handleChange}
      />
    </div>
  )
}

const Persons = (props) => {
  
  const personsToShow = 
    props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))
  
  return (
    <ul>        
      {personsToShow.map((person) => 
      <li key={person.name}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={newFilter} handleChange={handleFilterChange}/>

      <h2>Add a new</h2>

      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}
        persons={persons} setPersons={setPersons} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )

}

export default App