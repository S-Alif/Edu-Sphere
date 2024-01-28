const express = require('express')
const router = express.Router()

// contoller
const student = require('../../controller/studentController')

// auth verification
const authVerification = require('../../middleware/authVerification')

// student routes
router.post('/create', student.registerStudent)
router.post('/login', student.loginAccount)
router.post('/update', authVerification, student.updateAccount)

module.exports = router