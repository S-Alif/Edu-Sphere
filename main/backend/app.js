// install packages
const express = require('express')
const cors = require('cors')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()
const path = require('path');

const mainRoute = require('./src/routes/mainRoute')
const adminRoute = require('./src/routes/adminRoutes')

// declare app
const app = express()

app.use('/files', express.static(path.join(__dirname, 'src/files')));

// add security
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}))
app.use(cookieParser())
app.use(helmet())
app.use(hpp())

app.use(express.json({ limit: "6mb" }))
app.use(express.urlencoded({ extended: true }))

// rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10000 });
app.use(limiter);

// route connection
app.use('/public', mainRoute)
app.use('/admin', adminRoute)



module.exports = app