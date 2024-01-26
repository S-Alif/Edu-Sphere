// install packages
const express = require('express')
const cors = require('cors')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const dotenv = require('dotenv').config()

const mainRoute = require('./src/routes/mainRoute')

// declare app
const app = express()

// add security
app.use(cors())
app.use(helmet())
app.use(hpp())

app.use(express.json({limit: "6mb"}))
app.use(express.urlencoded({extended: true}))

// rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// route connection
app.use('/public', mainRoute)
// app.use('/admin')



module.exports = app