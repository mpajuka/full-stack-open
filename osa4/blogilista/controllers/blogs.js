const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)
  const users = await User.find({})
  const placeHolderUser = users[0]
  const blog = new Blog({ ...body, user: user === null ? placeHolderUser.id : user.id })

  const savedBlog = await blog.save()
  if (user !== null) {
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
  } else {
    placeHolderUser.blogs = placeHolderUser.blogs.concat(savedBlog.id)
    await placeHolderUser.save()
  }

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = { ...body }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter