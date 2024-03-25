const express = require('express')
const router = express.Router()

// require routes
const studentRoutes = require('./publicRoutes/studentRoutes')
const instructorRoutes = require('./publicRoutes/teacherRoutes')
const basicRoutes = require('./publicRoutes/basicRoutes')
const paymentRoutes = require('./paymentRoutes')

router.use('/student', studentRoutes)
router.use('/teacher', instructorRoutes)
router.use('/basic', basicRoutes)
router.use('/payment', paymentRoutes)

module.exports = router