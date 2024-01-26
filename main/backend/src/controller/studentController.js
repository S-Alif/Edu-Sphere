const student = require('../services/studentService')

// registration
exports.registerStudent = async (req, res) => {
  const result = await student.create(req);
  res.status(200).json(result);
}

// login account
exports.loginAccount = async (req, res) => {
  const result = await student.login(req);
  res.status(200).json(result);
}

// updating account
exports.updateAccount = async (req, res) => {

}

// deleting account
exports.deleteAccount = async (req, res) => {

}

// updating account
exports.getAccount = async (req, res) => {

}