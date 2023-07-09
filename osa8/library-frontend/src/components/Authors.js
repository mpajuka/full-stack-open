import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_BIRTH } from "../queries"
import { useState } from "react"
import Select from 'react-select'

const Authors = (props) => {
  const [setBornTo, setSetBornTo] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);

  const [ updateBirth ] = useMutation(UPDATE_BIRTH, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const result = useQuery(ALL_AUTHORS, { 
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  const authorNames = authors.map(a => {
    return {
      value: a.name,
      label: a.name
    }
  })

  const setBirthYear = async (event) => {
    event.preventDefault()

    let name = selectedOption.value
    console.log(name, setBornTo)

    updateBirth({ variables: { name, setBornTo }})
    name = ''
    setSetBornTo('')
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={setBirthYear}>
        <h3>
          Set birthyear
        </h3>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={authorNames}
          />
        </div>
        <div>
          born
          <input 
            type="number"
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}>
          </input>
        </div>
        <button type="submit">update author</button>
      </form>
      
    </div>
  )
}

export default Authors
