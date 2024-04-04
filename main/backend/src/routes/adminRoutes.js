const express = require('express')
const router = express.Router()

//routes
const modifyRoutes = require('./adminRoutes/modifyRoutes')

// controllers
const admin = require('../controller/adminController')
const user = require('../controller/userController')
const course = require('../controller/courseController')
const subject = require('../controller/subjectController')
const review = require('../controller/reviewController')

// middleware
const adminAuth = require('../middleware/adminAuthVerification')


// basic routes
router.get('/user', adminAuth, user.userProfile)

// instructor
router.get('/instructors/:filter', adminAuth, user.getInstructors)
router.get('/instructors/approve/:id', adminAuth, user.instructorApproval)
router.get('/data-chart', adminAuth, admin.dataChart)

// courses
router.get('/instructors/course/:id', adminAuth, course.courseByInstructor_admin)
router.get('/instructors/subjects/:id', adminAuth, subject.getSubByInstructor)
router.get('/instructors/reviews/:id', adminAuth, review.instructorReview)
router.get('/instructors/:id/:role', adminAuth, user.userProfile)

//Admin modify Route
router.use('/modify', modifyRoutes)

module.exports = router