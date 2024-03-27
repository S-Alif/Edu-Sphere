const express = require('express')
const router = express.Router()

// controllers
const instructor = require("../../controller/instructorController")
const subject = require("../../controller/subjectController")
const course = require("../../controller/courseController")
const user = require("../../controller/userController")
const batch = require("../../controller/batchController")
const modules = require("../../controller/moduleController")

const authVerification = require('../../middleware/authVerification')

// login / register
router.post("/login", user.userLogin)
router.post("/register", user.userRegister)
<<<<<<< HEAD
router.post('/send-otp', user.mailSend)
=======
router.post('/send-otp/:email/:type', user.mailSend)
>>>>>>> b1a00d0f64c63e5d0665193873c21ea6ce447796
router.post('/verify-otp', user.verifyOtpMail)
router.post("/logout", user.userLogout)

router.get('/user/:email', user.userByEmail)

// update pass
router.post('/pass-change', authVerification, user.userPassUpdate)
router.post('/pass-public-change', user.userPassUpdate)

// instructor routes
router.get('/instructors', instructor.getAllInstructors)

// course routes
router.get('/courses-instructor/:id', course.courseByInstructor)
router.get('/course/:id', course.forCourseDetail)
router.get('/batch/:id', batch.getBatch)

// subjects
router.get('/classes', subject.classes)
router.get('/subjects', subject.getAllSubject)
router.get('/subjects/:id', subject.getSubByInstructor)

// get course
router.get('/all-course/:course/:class', course.courseCards)
router.get('/module/:course/:batch', modules.getAllModule)

// instructor public profile
router.get('/user/:id/:role', user.userProfile)
router.get('/course-by-instructor/:id', course.courseByInstructor)

module.exports = router