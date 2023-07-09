import { useQuery, useLazyQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [showAll, setShowAll] = useState(true)

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const [getData, {data, error, loading}] = useLazyQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading || loading) {
    return <div>fetching data...</div>
  }
  if (error) {
    return <div>an error occurred</div>
  }
    
  const books = result.data.allBooks
  const genreArray = books.map(b => b.genres)
  const uniqueGenres = genreArray.flat().filter((x, i, a) => a.indexOf(x) === i)
  
  const handleFilterChange = (event) => {
    event.preventDefault()
    getData({ variables: { genre: event.target.value }})
    setShowAll(false)
  }

  return (
    <div>
      {showAll &&
        <div>
          <h2>books</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {uniqueGenres.map((g) => (
            <button key={g} value={g} onClick={handleFilterChange}>{g}</button>
          ))}
        </div>
      }
      {!showAll &&
        <div>
          <h2>books</h2>
    
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {uniqueGenres.map((g) => (
            <button key={g} onClick={() => getData({ variables: { genre: g }})}>{g}</button>
          ))}
          <button onClick={() => setShowAll(true)}>all genres</button>
        </div>
      }
    </div>
  )
}

export default Books
