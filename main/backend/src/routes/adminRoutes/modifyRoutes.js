const express = require('express')
const router = express.Router()

//controler 
const subject = require('../../controller/subjectController')


// middleware
const adminAuth = require('../middleware/adminAuthVerification')


module.exports = router