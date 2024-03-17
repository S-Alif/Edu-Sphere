const express = require('express')
const router = express.Router()

// controller
const instructor = require("../../controller/instructorController")
const course = require("../../controller/courseController")
const user = require("../../controller/userController")

// middleware
const authVerification = require('../../middleware/authVerification')

// instructor routes
router.post('/update', authVerification, user.userUpdate)
router.post('/delete', authVerification, user.userDelete)
router.get('/user', authVerification, user.userProfile)
router.get('/user/:id', user.userProfile)


// course routes
router.post('/create-course', authVerification, course.createCourse)
router.post('/update-course', authVerification, course.updateCourse)
router.post('/delete-course', authVerification, course.deleteCourse)
router.get('/course-names', authVerification, course.courseNames)

module.exports = router