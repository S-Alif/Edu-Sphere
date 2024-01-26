const express = require('express')
const router = express.Router()

// contoller
const student = require('../../controller/studentController')

// student routes
router.post('/create', student.registerStudent)
router.post('/login', student.loginAccount)
router.post('/update')

module.exports = router