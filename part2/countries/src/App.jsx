import { useEffect, useState } from 'react'
import './App.css'
import countriesServices from './services/countries'

function App() {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [wind, setWind] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)

  useEffect(() => {
    countriesServices
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, []) 

  useEffect(() => {
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()))

    if (filtered.length == 1) {
      setCountry(filtered[0])      
    } else {
      setCountry(null)
      setTemperature(null)
      setWind(null)
    }
  }, [input, countries])

  useEffect(() => {
    if (country) {
      setWeatherLoading(true);
      console.log('Fetching weather for', country.name.common, country.latlng);
      countriesServices
        .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
        .then(response => {
          console.log('Weather response:', response);
          setTemperature(response.data.main.temp);
          setWind(response.data.wind.speed);
          setWeatherLoading(false);
        })
        .catch(err => {
          setWeatherLoading(false);
          setTemperature(null);
          setWind(null);
          console.error('Weather fetch error:', err);
        });
    }
  }, [country])

  const handleChange = event => {
    console.log(event.target.value)
    setInput(event.target.value)
  }

  const CountriesReturned = () => {
    if(input === "") {
      return null
    }

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()))
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
          {filteredCountries.map(country => (
            <li key={country.name.common}>
              {country.name.common} <button onClick={() => handleCountryClick(country)}>show</button>
            </li>
          ))}
        </ul>
      )
    } else if (filteredCountries.length === 1 && country) {
      const languages = country.languages;
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
          <h1>Weather in {country.capital}</h1>
          {weatherLoading ? (
            <p>Loading weather...</p>
          ) : (
            <>
              <p>Temperature {temperature !== null ? (temperature - 273.15).toFixed(2) + ' celcius' : 'N/A'}</p>
              <p>Wind {wind !== null ? wind + ' m/s' : 'N/A'}</p>
            </>
          )}
        </div>
      );
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
