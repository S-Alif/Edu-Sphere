const express = require('express')
const router = express.Router()

//controler 
const subject = require('../../controller/subjectController')

// middleware
const adminAuth = require('../../middleware/adminAuthVerification')

// subejct routes
router.post('/create-sub', adminAuth, subject.subjectCreate)
router.post('/update-sub/:id', adminAuth, subject.subjectUpdate)
router.post('/delete-sub/:id', adminAuth, subject.subjectDelete)
router.get('/get-all-sub', adminAuth, subject.getAllSubject)


module.exports = router