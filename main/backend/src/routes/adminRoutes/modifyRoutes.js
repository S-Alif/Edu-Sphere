const express = require('express')
const router = express.Router()

//controler 
const subject = require('../../controller/subjectController')

// middleware
const adminAuth = require('../../middleware/adminAuthVerification')

// subejct routes
router.post('/create-sub', adminAuth, subject.subjectCreate)
router.post('/update-sub/:id', adminAuth, subject.subjectUpdate)
router.get('/delete-sub/:id', adminAuth, subject.subjectDelete)
router.get('/get-all-sub', adminAuth, subject.getAllSubject)

// instructors
router.get('/get-instructors', adminAuth)
router.get('/get-instructors/:id', adminAuth)
router.post('/instructor/:id', adminAuth)

module.exports = router