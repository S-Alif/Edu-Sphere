const express = require('express')
const router = express.Router()

// controller
const instructor = require("../../controller/instructorController")

// student routes
router.post('/create', instructor.registerInstructor)
router.post('/login', instructor.loginAccount)
router.post('/update')

module.exports = router