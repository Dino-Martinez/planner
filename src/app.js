// Requirements
const express = require('express')
const helmet = require('helmet') // Security and HTTP header middleware
const cors = require('cors') // Handling CORS for accessible APIs
const morgan = require('morgan') // Request logging
const compression = require('compression') // GZIP middleware for compressing responses
require('dotenv').config()

// App
const app = express()

// Set up default mongoose connection
const mongoose = require('mongoose')
const DB_URI = process.env.MONGO_URI
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', err => {
  console.error(err)
})
db.once('open', () => {
  // we're connected!
  console.log('Connected to DB')
})

// Middleware
app.use(morgan('common'))
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true })) // Handling form data
app.use(express.json()) // Handling JSON data
app.use(compression())

// Routes
require('./routes/index.js')(app)

// Export App for server/testing
module.exports = app
