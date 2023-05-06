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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  blogsInDb, initialBlogs
}