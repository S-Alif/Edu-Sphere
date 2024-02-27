const express = require('express')
const router = express.Router()

// controllers
const instructor = require("../../controller/instructorController")
const subject = require("../../controller/subjectController")
const course = require("../../controller/courseController")

// instructor routes
router.get('/instructors', instructor.getAllInstructors)

// course routes
router.get('/courses', course.courses)
router.get('/courses-instructor/:id', course.courseByInstructor)
router.get('/courses-subject/:subject', course.courseBySubject)
router.get('/courses-class/:class', course.courseByClass)
router.get('/courses-code/:code', course.courseByCode)

// subjects
router.get('/classes', subject.classes)
router.get('/subjects', subject.getAllSubject)
router.get('/subjects/:class', subject.subjectByClass)


module.exports = router