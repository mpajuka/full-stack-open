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

test('blog without likes determined sets it to zero', async () => {
  const blogWithoutLikes = {
    title: 'Blog-without-likes',
    author: 'John Doe',
    url: 'example.com',
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const zeroLikes = blogsAtEnd.map(b => b.likes)
  expect(zeroLikes).toContain(0)
})
describe('Bad request', () => {
  test('if blog does not contain title', async () => {
    const blogWithoutTitle = {
      author: 'John Doe',
      url: 'example.com'
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
  })

  test('if blog does not contain url', async () => {
    const blogWithoutUrl = {
      title: 'Blog without url',
      author: 'John Doe'
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  })
})

test('blog deleted based on id succeeds if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDB()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  expect(blogsAtEnd).not.toContain(blogToDelete)
})


afterAll(async () => {
  await mongoose.connection.close()
})