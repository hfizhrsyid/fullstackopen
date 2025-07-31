const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')

const app = express()

app.use(express.json())
app.use('', blogRouter)

mongoose.connect(config.MONGODB_URI)

module.exports = app