const express = require('express')
const router = express.Router()

// controllers
const instructor = require("../../controller/instructorController")

// instructor routes
router.get('/instructors', instructor.getAllInstructors)

// course routes
router.get('/courses')


module.exports = router