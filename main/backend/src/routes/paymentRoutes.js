const express = require('express')
const router = express.Router()


const payment = require('../controller/invoiceController')
const authVerification = require('../middleware/authVerification')


// payment routes
router.post('/invoice-create', authVerification, payment.createInvoice)

router.post('/pay-success/:trxID', payment.successPayment)
router.post('/pay-fail/:trxID', payment.failPayment)
router.post('/pay-cancel/:trxID', payment.cancelPayment)
router.post('/pay-ipn/:trxID', payment.ipnPayment)


module.exports = router