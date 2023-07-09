import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Recommend = (props) => {

  const user = useQuery(ME)
  const {data, error, loading} = useQuery(ALL_BOOKS)
 
  if (!props.show) return null 
  
  if(loading || user.loading) {
    <div>fetching data</div>
  }
  
  if (error || user.error) {
    <div>an error occurred</div>
  }
  
  const favoriteBooks = data.allBooks.filter(b => b.genres.includes(user.data.me.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.data.me.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend