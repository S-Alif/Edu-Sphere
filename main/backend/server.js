// get app
const { app } = require('./app')
const port = process.env.port || 7000

app.listen(port, () => {
  console.log("server running at port - " + port)
})