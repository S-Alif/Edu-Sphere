const express = require('express')
const router = express.Router()

// controller
const instructor = require("../../controller/instructorController")
const course = require("../../controller/courseController")

// middleware
const authVerification = require('../../middleware/authVerification')

// instructor routes
router.post('/create', instructor.registerInstructor)
router.post('/login', instructor.loginAccount)
router.post('/update', authVerification, instructor.updateAccount)
router.post('/delete', authVerification, instructor.deleteAccount)
router.get('/user', authVerification, instructor.getAccount)
router.get('/user/:id')


// course routes
router.post('/create-course', authVerification, course.createCourse)
router.post('/update-course', authVerification, course.updateCourse)
router.post('/delete-course', authVerification, course.deleteCourse)
router.get('/course-names', authVerification, course.courseNames)

module.exports = router