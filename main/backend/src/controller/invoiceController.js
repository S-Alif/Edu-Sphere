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
  const redirectUrl = `http://localhost:5173/enroll/failed`;
  res.redirect(redirectUrl)
}

// payment cancel
exports.cancelPayment = async (req, res) => {
  let result = await invoice.PaymentCancelService(req)
  const redirectUrl = `http://localhost:5173/enroll/canceled`;
  res.redirect(redirectUrl)
}

// payment ipn
exports.ipnPayment = async (req, res) => {
  let result = await invoice.PaymentIPNService(req)
  res.status(200).json(result)
}