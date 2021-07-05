import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Filter = ({ value, handler }) => {
  return (
    <div>
      find countries: <input value={value} onChange={handler} />
    </div>
  )
}

const Countries = ({ countries, filterWord }) => {
  const countriesToShow = filterWord === '' ? countries : 
  countries.filter(country => country.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1)
  if (countriesToShow.length > 10)
    return <div>Too many matches, specify another filter</div>
  
  if (countriesToShow.length === 1) {
    console.log(countriesToShow)
    return <CountryDetail country={countriesToShow[0]} />
  }
  return (
    <div>
      {countriesToShow.map(country => <Country key={country.name} country={country} />)}
    </div>
  )
}

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>{country.capital}</div>
      <div>{country.population}</div>
      <h2>languages</h2>
      <Languages languages={country.languages} /><br />
      <img src={country.flag} alt='flag' height="300" />
    </div>
  )
}

const Languages = ({ languages }) => languages.map(language => <li key={language.name}>{language.name}</li>)

const Country = ({ country }) => <div>{country.name}</div>

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  const hook = () => {
    axios.get('http://restcountries.eu/rest/v2/all')
      .then(response => {
        const country = response.data
        setCountries(country)
      })
  }

  useEffect(hook, [])

  const handleFilterInput = (event) => setFilterCountry(event.target.value)

  return (
    <div>
      <h2>Country Data</h2>
      <Filter value={filterCountry} handler={handleFilterInput} />

      <Countries countries={countries} filterWord={filterCountry} />
    </div>
    
  )
}


export default App;
