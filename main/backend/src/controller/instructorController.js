const instructor = require('../services/instructorService')

// registration
exports.registerInstructor = async (req, res) => {
    const result = await instructor.create(req);
    res.status(200).json(result);
}

// login account
exports.loginAccount = async (req, res) => {
  
}

// updating account
exports.updateAccount = async (req, res) => {
    const result = await instructor.update(req);
    res.status(200).json(result);
}

// deleting account
exports.deleteAccount = async (req, res) => {
    const result = await instructor.delete(req);
    res.status(200).json(result);
}

// updating account
exports.getAccount = async (req, res) => {
    const result = await instructor.getData(req);
    res.status(200).json(result);
}