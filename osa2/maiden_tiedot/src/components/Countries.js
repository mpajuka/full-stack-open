const Countries = ({ countries, countryFilter }) => {
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

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
                        <h1>{c.name.common}</h1>
                        <p>capital {c.capital}<br />area {c.area}</p>
                        <strong>languages:</strong>
                        <ul>
                            {Object.entries(c.languages).map(([key, val]) =>
                                <li key={key}>{val}</li>
                            )}
                        </ul>
                        <img src={c.flags.png} alt="flag-of-country" />
                    </div>     
                )}
            </div>
        )   
    } else {
        return (
            <div>
                {filteredCountries.map(c => 
                    <div key={c.name.common}>
                        <p>{c.name.common}</p>
                    </div>
                )}
            </div>
        )
    }
}

export default Countries