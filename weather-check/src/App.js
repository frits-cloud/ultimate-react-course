import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [selectedCountry, setSelectedCountry] = useState({})

  return (
    <div className="App">
      <NavBar><Search />
      </NavBar>
      <Main>
        <LeftPane selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        <RightPane selectedCountry={selectedCountry} />
      </Main>

    </div>
  );
}

const Search = () => {
  return <input type="text"></input>
}

const NavBar = ({ children }) => {
  return (
    <div className="navbar">{children}</div>
  )
}

const Main = ({ children }) => {
  return (
    <div className="main">
      {children}
    </div>
  )
}

const LeftPane = ({ selectedCountry, setSelectedCountry }) => {

  const [countries, setCountries] = useState([])
  const countryApi = `https://restcountries.com/v3.1/region/europe?fields=name,capital,capitalInfo`

  useEffect(function () {
    async function getCountries() {
      const res = await fetch(countryApi)
      const data = await res.json()
      setCountries(data)
    }
    getCountries()
  }, [countryApi])

  const sortedCountries = countries.slice()
  sortedCountries.sort((a, b) => {
    return a.name.official.localeCompare(b.name.official);
  })



  return (<div className="left-pane">
    <h1>Countries</h1>

    {sortedCountries.map((country) => {
      return (
        <div onClick={() => { setSelectedCountry(country) }} className={selectedCountry === country ? `country-item selected` : `country-item`}>{country.name.official}</div>
      )
    })}
  </div>)
}
const RightPane = ({ selectedCountry }) => {

  useEffect(function () {
    async function getWeatherInfo() {
      if (selectedCountry?.capitalInfo?.latlng) {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCountry.capitalInfo.latlng[0]}&longitude=${selectedCountry.capitalInfo.latlng[1]}&hourly=temperature_2m`)
        const data = await res.json()
        console.log(data)
      } else { console.log("none") }

    }
    getWeatherInfo();
  }, [selectedCountry])
  return (<div className="right-pane">
    <h1>Details</h1>
    <p>
      {selectedCountry?.capitalInfo?.latlng ? (
        JSON.stringify(selectedCountry.capitalInfo.latlng)
      ) : (
        ''
      )}
    </p>
  </div>)
}
export default App;
