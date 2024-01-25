const express = require('express')
const router = express.Router()

// student routes
router.post('/create')
router.post('/login')
router.post('/update')

module.exports = router