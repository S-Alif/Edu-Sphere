const express = require('express')
const router = express.Router()

// controller
const student = require('../../controller/studentController')
const user = require("../../controller/userController")
const classes = require("../../controller/classController")

// auth verification
const authVerification = require('../../middleware/authVerification')

// student routes
router.post('/update', authVerification, user.userUpdate)
router.post('/delete', authVerification, user.userDelete)
router.get('/user', authVerification, user.userProfile)

// enroll routes
router.post('/enroll', authVerification, user.courseEnroll)
router.get('/enroll-course/:id', authVerification, user.studentEnrollCourse)

router.get('/get-lives/:moduleId', authVerification, classes.getAllLives)
router.get('/get-assignments/:moduleId', authVerification, classes.studentAssignment)

module.exports = router