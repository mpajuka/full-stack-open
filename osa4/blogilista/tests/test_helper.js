const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'title': 'Test-title',
    'author': 'John Doe',
    'url': 'example.com',
    'likes': 100
  },
  {
    'title': 'Test-title',
    'author': 'John Doe',
    'url': 'example.com',
    'likes': 100
  }
]

const blogsInDB = async () => {
  const notes = await Blog.find({})
  return notes.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDB, usersInDb
}