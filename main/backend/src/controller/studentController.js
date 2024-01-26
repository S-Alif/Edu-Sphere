const student = require('../services/studentService')

// registration
exports.registerStudent = async (req, res) => {
  const result = await student.create(req);
  res.status(200).json(result);
}