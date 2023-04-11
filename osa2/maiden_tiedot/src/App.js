import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import countryService from './services/countryService'
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCounties] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCounties(allCountries)
      })
  }, [])
  const handleNewFilter = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={countryFilter} eventHandler={handleNewFilter} />
      <Countries key={countries.name} countries={countries} countryFilter={countryFilter} />
    </div>
  )
}

export default App;
