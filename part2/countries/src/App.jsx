import { useEffect, useState } from 'react'
import './App.css'
import countriesServices from './services/countries'

function App() {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesServices
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, []) 

  const handleChange = event => {
    console.log(event.target.value)
    setInput(event.target.value)
  }

  const CountriesReturned = () => {
    if(input === "") {
      return null
    }

    const filteredCountries = countries.filter(country => country.name.common.includes(input))
    const handleCountryClick = country => {
      setInput(country.name.common)
    }

    if(filteredCountries.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map(country => <li key={country.name.common}>{country.name.common} <button onClick={() => handleCountryClick(country)}>show</button></li>)}
        </ul>
      )
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries.find(country => country.name.common.includes(input))
      const languages = country.languages
      console.log(languages)
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>{country.capital}</p>
          <p>Area {country.borders.area}</p>
          <h1>Languages</h1>
          <ul>
            {Object.values(languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flags.png} alt="flag" />
        </div>
      )
    } else {
      return (
        <p>No countries found.</p>
      )
    }
  }

  return (
    <div>
      <p>find countries <input value={input} type="text" onChange={handleChange} /></p>
      <div>
        <CountriesReturned />
      </div>
    </div>
  )
}

export default App
