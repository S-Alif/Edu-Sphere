const express = require('express')
const router = express.Router()

// controller
const instructor = require("../../controller/instructorController")
const course = require("../../controller/courseController")
const user = require("../../controller/userController")
const subject = require("../../controller/subjectController")
const batch = require("../../controller/batchController")
const modules = require("../../controller/moduleController")

// middleware
const authVerification = require('../../middleware/authVerification')

// instructor routes
router.post('/update', authVerification, user.userUpdate)
router.post('/delete', authVerification, user.userDelete)
router.get('/user', authVerification, user.userProfile)
router.get('/user/:id', user.userProfile)
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

module.exports = router