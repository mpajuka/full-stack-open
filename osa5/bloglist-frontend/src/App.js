import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrormessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
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
      setSuccessMessage(`a new blog ${title} by ${author} added`)

      const getBlogs = await blogService.getAll()
      setBlogs(getBlogs)

      setTimeout(() => {
        setSuccessMessage(null)
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

  const handleLike = async (blog) => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    await blogService.update(blog.id, likedBlog)
    const getUpdated = await blogService.getAll()
    setBlogs(getUpdated)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.removeBlog(blog.id)
        const getUpdated = await blogService.getAll()
        setBlogs(getUpdated)
        setSuccessMessage(`Successfully removed ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch(exception) {
        setErrormessage('unable to delete blog')
        setTimeout(() => {
          setErrormessage(null)
        }, 5000)
      }
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
      <Notification message={successMessage} type='success' />
      <p>{user.name} logged in&nbsp;
        <button onClick={handleLogout}>
          log out
        </button>
      </p>
      <Togglable buttonLabel='create a new blog'>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleSubmit={handleCreate}
        />
      </Togglable>
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            incrementLike={() => handleLike(blog)}
            removeBlog={() => handleRemove(blog)}
            loggedUser={user}
          />
        )}
      </div>
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