const Persons = ({ persons, nameFilter }) => {
    return (
      <div>
        {persons.filter(p =>
            p.name.toLowerCase().includes(nameFilter.toLowerCase())
            ).map(person =>
            <p key={person.name}>
                {person.name} {person.number}
            </p>
        )}
      </div>
    )
}

export default Persons