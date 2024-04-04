const { cookieMaker } = require('../helpers/helper')
const admin = require('../services/adminService')


// chart data
exports.dataChart = async (req, res) => {
  let result = await admin.chartData(req)
  res.status(200).json(result)
}

// notify instructor
exports.sendNotification = async (req, res) => {
  let result = await admin.notify(req)
  res.status(200).json(result)
}