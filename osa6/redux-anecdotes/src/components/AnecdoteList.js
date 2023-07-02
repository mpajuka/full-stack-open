import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { notificationSet } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => {
      return a.content.toLowerCase().includes(state.filter.toLowerCase())
    })
  })
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote.id))
    dispatch(notificationSet(`you voted '${anecdote.content}`))
    setTimeout(() => {
      dispatch(notificationSet(''))
    }, 5000)
    
  }


  return (
    <div style={style}>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList