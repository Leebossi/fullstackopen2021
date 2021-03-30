import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = (props) => {
  return (
    <div>
      find countries <input
        value={props.filter}
        onChange={props.handleChange}
      />
    </div>
  )
}


const ShowCountryInfo = (props) => {
  return (
    <div>
      <h1>{props.country.name}</h1>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h2>languages</h2>
      <ul>
        {props.country.languages.map((language) =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={props.country.flag} alt={props.country.name} style={{ width: 200 + 'px' }} />
    </div>
  )
}

const Countries = (props) => {

  const countriesToShow =
    props.countries.filter(country => country.name.toLowerCase().includes(props.newFilter.toLowerCase()))

  if (countriesToShow.length === 1) {
    return (
      <ShowCountryInfo country={countriesToShow[0]} />
    )
  } else if (countriesToShow.length < 10) {
    return (
      <div>
        {countriesToShow.map((country) =>
          <p key={country.name}>
            {country.name}
            <button onClick={() =>
              props.handleClick(country.name)}>
              show
               </button>
          </p>
        )}
      </div>
    )
  } else {
    return (
      <p>Too many matches, be more specific</p>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleShowClick = (countryName) => {
    setNewFilter(countryName.toLowerCase())
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filter={newFilter} handleChange={handleFilterChange} />
      <Countries countries={countries} newFilter={newFilter} handleClick={handleShowClick} />
    </div>
  );
}

export default App;
