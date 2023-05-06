const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have an identifier named "id"', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blog correctly added to database', async () => {
  const newBlog = {
    title: 'Test-blog',
    author: 'John Doe',
    url: 'example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(b => b.title)
  expect(title).toContain('Test-blog')
  const author = blogsAtEnd.map(b => b.author)
  expect(author).toContain('John Doe')
  const url = blogsAtEnd.map(b => b.url)
  expect(url).toContain('example.com')
  const likes = blogsAtEnd.map(b => b.likes)
  expect(likes).toContain(5)

})


afterAll(async () => {
  await mongoose.connection.close()
})