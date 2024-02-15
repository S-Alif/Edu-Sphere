const mysql = require('mysql2')

// connecting to database
const database = mysql.createConnection({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPass,
  database: process.env.dbName
})

// handling error when connecting
database.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log("databse connected")
})


module.exports = database.promise()