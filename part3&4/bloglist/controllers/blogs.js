const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', async (request, response) => {
  const blog = await Blog.find({})

  response.json(blog)
})

blogRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()

  response.json(result)
})

module.exports = blogRouter