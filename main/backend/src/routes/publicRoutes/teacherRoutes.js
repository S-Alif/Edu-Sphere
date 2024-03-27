const express = require('express')
const router = express.Router()

// controller
const instructor = require("../../controller/instructorController")
const course = require("../../controller/courseController")
const user = require("../../controller/userController")
const subject = require("../../controller/subjectController")
const batch = require("../../controller/batchController")
const modules = require("../../controller/moduleController")
const classes = require("../../controller/classController")

// middleware
const authVerification = require('../../middleware/authVerification')

// instructor routes
router.post('/update', authVerification, user.userUpdate)
router.post('/delete', authVerification, user.userDelete)
router.get('/user', authVerification, user.userProfile)
router.get('/subjects', authVerification, subject.getSubByInstructor)


// course routes
router.post('/create-course', authVerification, course.createCourse)
router.post('/update-course/:id', authVerification, course.updateCourse)
router.post('/delete-course', authVerification, course.deleteCourse)
router.get('/course-names', authVerification, course.courseNames)
router.get('/course/:id', authVerification, course.courseById)

// batch routes
router.post('/create-batch', authVerification, batch.batchCreate)
router.post('/update-batch/:course/:id', authVerification, batch.batchUpdate)
router.get('/get-batch', authVerification, batch.getBatchByInstructor)
router.get('/batch/:course/:id', authVerification, batch.getBatchById)

// module routes
router.post('/create-module', authVerification, modules.moduleCreate)
router.post('/update-module/:batch/:id', authVerification, modules.moduleUpdate)
router.post('/delete-module/:batch/:id', authVerification, modules.moduleDelete)
router.get('/get-module/:batch/:id', authVerification, modules.getModuleById)
router.get('/modules/:course/:batch', authVerification, modules.getAllModule)

// assignment routes
router.post('/create-assignment', authVerification, classes.createAssignment)
router.post('/update-assignment/:module/:id', authVerification, classes.updateAssignment)
router.post('/delete-assignment/:module/:id', authVerification, classes.deleteAssignment)
router.get('/get-assignment/:moduleId', authVerification, classes.getAssignmentById)

// submitted assignments
router.get('/assignment-submits/:id', authVerification, classes.toMarkAssignments)
router.post('/update-marks/:studentId/:assignmentId', authVerification, classes.markAssignments)

// live class routes
router.post('/create-live', authVerification, classes.createLive)
router.post('/update-live/:module/:id', authVerification, classes.updateLive)
router.post('/delete-live/:module/:id', authVerification, classes.deleteLive)
router.get('/get-live/:moduleId/:id', authVerification, classes.getLiveId)
router.get('/get-lives/:moduleId', authVerification, classes.getAllLives)

// payment
router.get('/payment/:courseId', authVerification, user.instructorPayInfo)

module.exports = router