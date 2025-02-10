const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog.js')
const blogsRouter = require('./controllers/blogs.js')
console.log(blogsRouter)
app.use('/api/blogs', blogsRouter)
const mongoose = require('mongoose')
const { MONGODB_URL, PORT } = require('./utils/config.js')
const { morgan, errorHandler } = require('./utils/mildware.js')
const mongoUrl = MONGODB_URL
console.log('connecting to', mongoUrl)
mongoose.connect(mongoUrl).then(() => console.log('connected to mongoose')).catch(error => console.log('error connecting to mongoose', error.message))

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :type :res[content-length] - :response-time ms'))
app.use(errorHandler)
module.exports = app