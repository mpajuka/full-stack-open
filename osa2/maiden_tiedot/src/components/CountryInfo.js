const CountryInfo = (props) => {
    if (props.country.capital !== undefined) {
        return (
            <div>
                <h1>{props.country.name.common}</h1>
                <strong>capital:</strong>
                <ul>
                    {props.country.capital.map(capital =>
                        <li key={capital}>
                            {capital}
                        </li>
                    )}
                </ul>
                <p><strong>area</strong>: {props.country.area} km&#178;</p>
                <strong>languages:</strong>
                <ul>
                    {Object.entries(props.country.languages).map(([key, val]) =>
                        <li key={key}>{val}</li>
                    )}
                </ul>
                <img src={props.country.flags.png} alt="flag-of-country" />
            </div>
        )
    }
    if (props.country.capital === undefined && props.country.languages === undefined) {
        return (
            <div>
                <h1>{props.country.name.common}</h1>
                <p><strong>area</strong>: {props.country.area} km&#178;</p>
                <img src={props.country.flags.png} alt="flag-of-country" />
            </div>
       )
    
    } else {
        return (
            <div>
                <h1>{props.country.name.common}</h1>
                <p>area {props.country.area} km&#178;</p>
                <strong>languages:</strong>
                <ul>
                    {Object.entries(props.country.languages).map(([key, val]) =>
                        <li key={key}>{val}</li>
                    )}
                </ul>
                <img src={props.country.flags.png} alt="flag-of-country" />
            </div>
       ) 
    } 
    
}

export default CountryInfo