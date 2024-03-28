const express = require('express')
const router = express.Router()

// controller
const student = require('../../controller/studentController')
const user = require("../../controller/userController")
const classes = require("../../controller/classController")
const review = require("../../controller/reviewController")

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

router.get('/live/:moduleId/:id', authVerification, classes.getLiveId)
router.get('/assignment/:moduleId', authVerification, classes.getAssignmentById)

router.get('/check-assignment/:assignment/:id', authVerification, classes.checkStudentAssignment)
router.post('/submit-assignment', authVerification, user.AssignmentSubmit)

router.get('/payment', authVerification, user.studentPayInfo)


// review routes
router.post('/instructor-review', authVerification, review.instructorReviewCreate)
router.post('/site-review', authVerification, review.siteReviewCreate)
router.post('/course-review', authVerification, review.courseReviewCreate)


module.exports = router