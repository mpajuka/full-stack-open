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


afterAll(async () => {
  await mongoose.connection.close()
})