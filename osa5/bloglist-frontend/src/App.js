import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrormessage] = useState(null)
  const [blogAddMessage, setBlogAddMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrormessage('wrong username or password') 
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url
      })
      setBlogs(blogs.concat(newBlog))
      setBlogAddMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setBlogAddMessage(null)
      }, 5000)
      setAuthor('')
      setUrl('')
      setTitle('')
    } catch (exception) {
      setErrormessage('Unable to add blog, missing fields')
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
    
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} type='error' />
        <form onSubmit={handleLogin}>
          <div>
            username&nbsp;
              <input type='text' value={username} name='Username' 
                onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password&nbsp;
              <input type='password' value={password} name='Password'
                onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <p>
            <button type='submit'>login</button>
          </p>
      </form>
    </div> 
  )

  const blogView = () => (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} type='error' />
      <Notification message={blogAddMessage} type='success' />
      <p>{user.name} logged in&nbsp;
        <button onClick={handleLogout}>
          log out
        </button>
      </p>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title&nbsp;
          <input type='text' value={title} name='Title'
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author&nbsp;
          <input type='text' value={author} name='Author'
            onChange={({ target }) => setAuthor(target.value)}/>
        </div> 
        <div>
          url&nbsp;
          <input type='text' value={url} name='Url'
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <p>
          <button type='submit'>create</button>
        </p>
      </form>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && blogView()}
    </div>
  )
}

export default App