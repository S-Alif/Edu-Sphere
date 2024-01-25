// install packages
const express = require('express')
const cors = require('cors')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mysql = require('mysql2')
const dotenv = require('dotenv').config()

// declare app
const app = express()

// add security
app.use(cors())
app.use(helmet())
app.use(hpp())

// rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// connecting to database
const database = mysql.createConnection({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPass,
  database: process.env.dbName
})

// handle connection
database.connect((err) => {
  if(err){
    console.log("databse connection error : ", err)
    return
  }
  console.log("databse connected")
})

module.exports = {app}