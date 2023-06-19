const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let userToken = ''

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const user = { username: 'root', password: 'password' }
  await api
    .post('/api/users')
    .send(user)

  const userLogin = await api
    .post('/api/login')
    .send(user)
  userToken = userLogin.body.token

  await api
    .post('/api/blogs')
    .send(helper.initialBlogs[0])
    .set({ Authorization: `Bearer ${userToken}` })
    .expect(201)
  await api
    .post('/api/blogs')
    .send(helper.initialBlogs[1])
    .set({ Authorization: `Bearer ${userToken}` })
    .expect(201)
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
    .set({ Authorization: `Bearer ${userToken}` })
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
    .set({ Authorization: `Bearer ${userToken}` })
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
      .set({ Authorization: `Bearer ${userToken}` })
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
      .set({ Authorization: `Bearer ${userToken}` })
      .expect(400)
  })
})

test('blog deleted based on id succeeds if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: `Bearer ${userToken}` })
    .expect(204)

  const blogsAtEnd = await helper.blogsInDB()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  expect(blogsAtEnd).not.toContain(blogToDelete)
})

test('successful like modification of single blog', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToEdit = blogsAtStart[0]

  const blogWithNewLikes = { ...blogToEdit, likes: 75211 }

  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(blogWithNewLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  const likes = blogsAtEnd.map(b => b.likes)
  expect(likes).toContainEqual(75211)
})

describe('User', () => {
  test('creation fails with username already in use', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('with valid content is created ', async () => {
    const usersAtStart = await helper.usersInDb()

    const validUser = {
      username: 'jdoe',
      name: 'John Doe',
      password: 'doespassword'
    }

    await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(validUser.username)
  })

  test('missing password raises an error', async () => {
    const usersAtStart = await helper.usersInDb()

    const missingPassword = {
      username: 'jdoe',
      name: 'John Doe'
    }

    await api
      .post('/api/users')
      .send(missingPassword)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('with less than 3 characters in their password raises an error', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidPassword = {
      username: 'jdoe',
      name: 'John Doe',
      password: 'do'
    }

    await api
      .post('/api/users')
      .send(invalidPassword)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('missing username raises an error', async () => {
    const usersAtStart = await helper.usersInDb()

    const missingUsername = {
      name: 'John Doe',
      password: 'doespassword'
    }

    await api
      .post('/api/users')
      .send(missingUsername)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('with less than 3 characters in their username raises an error', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUsername = {
      username: 'jd',
      name: 'John Doe',
      password: 'doespassword'
    }

    await api
      .post('/api/users')
      .send(invalidUsername)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})