const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    }).catch(error => next(error))
})
blogsRouter.get('/:id', (request, response, next) => {
  const Id = request.params.id
  Blog.findById(Id).then(data => response.json(data)).catch(error => next(error))
})
blogsRouter.post('/', (request, response, next) => {
  const body = request.body
  if (body.title === undefined){
    response.status(400).json({error: 'content is missing'})
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  blog.save().then(savedBlog => response.json(savedBlog)).catch(error =>
  next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id).then(() =>
  response.status(204).end).catch(error => next(error))
})
blogsRouter.put('/:id',(request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  Blog.findByIdAndUpdate(request.params.id, blog, { new:true }).then(updatedBlog => response.json(updatedBlog)).catch(error => next(error))
})

module.exports = blogsRouter