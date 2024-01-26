const mysql = require('mysql2')

// connecting to database
const database = mysql.createPool({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPass,
  database: process.env.dbName
})

module.exports = database.promise()