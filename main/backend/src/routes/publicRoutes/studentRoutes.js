const express = require('express')
const router = express.Router()

// controller
const student = require('../../controller/studentController')
const user = require("../../controller/userController")

// auth verification
const authVerification = require('../../middleware/authVerification')

// student routes
router.post('/update', authVerification, user.userUpdate)
router.post('/delete', authVerification, user.userDelete)
router.get('/user', authVerification, user.userProfile)

router.post('/enroll', authVerification, user.courseEnroll)

module.exports = router