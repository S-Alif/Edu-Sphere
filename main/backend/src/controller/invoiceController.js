const invoice = require('../services/invoiceService')


// invoice create
exports.createInvoice = async (req, res) => {
  let result = await invoice.CalculateInvoice(req)
  res.status(200).json(result)
}

// payment succes
exports.successPayment = async (req, res) => {
  let result = await invoice.PaymentSuccessService(req)
  const redirectUrl = `http://localhost:5173/enroll/success`;
  res.redirect(redirectUrl)
}

// payment fail
exports.failPayment = async (req, res) => {
  let result = await invoice.PaymentFailService(req)
  res.status(200).json(result)
}

// payment cancel
exports.cancelPayment = async (req, res) => {
  let result = await invoice.PaymentCancelService(req)
  res.status(200).json(result)
}

// payment ipn
exports.ipnPayment = async (req, res) => {
  let result = await invoice.PaymentIPNService(req)
  res.status(200).json(result)
}