const express = require('express')
const router = express.Router()

//routes
const modifyRoutes = require('./adminRoutes/modifyRoutes')

// controllers
const admin = require('../controller/adminController')

// middleware
const adminAuth = require('../middleware/adminAuthVerification')


// basic routes
router.post('/login', admin.login)
router.post('/register', admin.register)
router.post('/update', adminAuth, admin.update)
router.delete('/delete', adminAuth, admin.delete)
router.get('/user', adminAuth, admin.profile)

//Admin modify Route
router.use('/modify', modifyRoutes)

module.exports = router