const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, blogsInDB
}