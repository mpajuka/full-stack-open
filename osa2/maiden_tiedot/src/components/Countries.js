import Weather from './Weather'
import CountryInfo from './CountryInfo'

const Countries = ({ countries, countryFilter, handleShowCountry }) => {
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
    const exactlyFiltered = countries.filter(c => c.name.common.toLowerCase() === countryFilter.toLowerCase())
    
    if (filteredCountries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }

    if (filteredCountries.length === 1 ) {
        return (
                <div>
                    {filteredCountries.map(c =>
                        <div key={c.name.common}>
                            <CountryInfo country={c} />
                            <Weather filteredCountries={filteredCountries} country={c} />
                        </div>    
                    )}
                </div>
        )
    } 
    if (filteredCountries.length > 1) {
        // corner case-korjaus, näytetään maa silloin kun find kentän arvo on täysin sama kuin maan nimi
        if (exactlyFiltered.length === 1) {
            return (
                <div>
                    {exactlyFiltered.map(c =>
                        <div key={c.name.common}>
                            <CountryInfo country={c} />
                            <Weather filteredCountries={exactlyFiltered} country={c} />
                        </div> 
                    )}
                </div>
            )
        // show-painike muuttaa kentän arvoksi painikkeen viereisen maan nimen, jolloin ylempi ehto toteutuu
        } else {
            return (
                <div>
                    {filteredCountries.map(c => 
                        <div key={c.name.common}>
                            <p>
                                {c.name.common}&nbsp;
                                <button id={c.name.common} onClick={() => handleShowCountry(c.name.common)}>show</button>
                            </p>
                        </div>
                    )}
                </div>
            )
        }
    }
}

export default Countries