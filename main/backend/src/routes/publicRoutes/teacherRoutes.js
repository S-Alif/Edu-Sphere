const express = require('express')
const router = express.Router()

// controller
const instructor = require("../../controller/instructorController")

// middleware
const authVerification = require('../../middleware/authVerification')

// student routes
router.post('/create', instructor.registerInstructor)
router.post('/login', instructor.loginAccount)
router.post('/update', authVerification, instructor.updateAccount)
router.post('/delete', authVerification, instructor.deleteAccount)
router.get('/user', authVerification, instructor.getAccount)
router.get('/user/:id')

module.exports = router