import './App.css';
import { useEffect, useState, useRef, CSSProperties } from 'react'
import GridLoader from "react-spinners/GridLoader";

function App() {

  const [countryFilter, setCountryFilter] = useState("")
  const [selectedCountry, setSelectedCountry] = useState({})

  return (
    <div className="App">
      <NavBar><Search countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
      </NavBar >
      <Main>
        <LeftPane countryFilter={countryFilter} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        <RightPane selectedCountry={selectedCountry} />
      </Main>
    </div>
  );
}

const Search = ({ countryFilter, setCountryFilter }) => {
  const inputSearch = useRef(null)

  useEffect(() => {
    inputSearch.current.focus();

  }, [])
  return <input ref={inputSearch} placeholder='Search for a country' value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} type="text"></input>
}

const NavBar = ({ children }) => {
  return (
    <div className="navbar">{children}</div>
  )
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const Spinner = ({ color, loading }) => {
  return (<>
    <br />
    <br />
    <GridLoader
      color={color}
      loading={true}
      cssOverride={override}
      size={30}
    />
  </>
  )
}



const Main = ({ children }) => {
  return (
    <div className="main">
      {children}
    </div>
  )
}

const LeftPane = ({ countryFilter, selectedCountry, setSelectedCountry }) => {
  const controller = new AbortController
  const [loading, setLoading] = useState(true);
  const [color] = useState("#2c3e50");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const countryApi = `https://restcountries.com/v3.1/region/europe?fields=name,capital,capitalInfo`;



  // Initial fetch
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function getCountries() {
      setLoading(true);
      await sleep(1000); // simulate delay

      try {
        const res = await fetch(countryApi, { signal });
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        // Ignore AbortError — it's expected during unmounts
        if (err.name === 'AbortError') {
          console.log('Fetch aborted (component unmounted or new effect)');
        } else {
          console.error('Fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    }

    getCountries();
    return () => {
      controller.abort(); // abort fetch on unmount
    };
  }, [countryApi]);

  // Filter when countryFilter changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const sorted = countries
        .slice()
        .sort((a, b) => a.name.official.localeCompare(b.name.official))
        .filter(country =>
          country.name.official.toLowerCase().includes(countryFilter.toLowerCase())
        );

      setFilteredCountries(sorted);
      setLoading(false);
    }, 500); // small delay to simulate loading

    return () => clearTimeout(timer); // clear timeout if filter changes quickly
  }, [countryFilter, countries]);

  return (
    <div className="left-pane">
      <h1>Countries</h1>

      {loading ? (
        <Spinner color={color} loading={loading} />
      ) : (
        filteredCountries.map((country) => (
          <div
            key={country.name.official}
            onClick={() => setSelectedCountry(country)}
            className={
              selectedCountry === country
                ? `country-item selected`
                : `country-item`
            }
          >
            {country.name.official}
          </div>
        ))
      )}
    </div>
  );
};
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
