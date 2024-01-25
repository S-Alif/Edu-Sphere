const express = require('express')
const router = express.Router()

// require routes
const studentRoutes = require('./publicRoutes/studentRoutes')
const instructorRoutes = require('./publicRoutes/teacherRoutes')

router.use('/student', studentRoutes)
router.use('/teacher', instructorRoutes)

module.exports = router