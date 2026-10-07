const express = require('express')
const cookieParser = require('cookie-parser')

// routes require
const authRoutes = require('./routes/auth.route.js')
const chatRoutes = require('./routes/chat.route.js')

const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())

// auth  routes
app.use('/api/auth',authRoutes)
app.use('/api/chat',chatRoutes)

module.exports = app;