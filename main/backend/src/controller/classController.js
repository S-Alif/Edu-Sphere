const classes = require('../services/classService')

// create assignment
exports.createAssignment = async (req, res) => {
  let result = await classes.assignmentCreate(req)
  res.status(200).json(result)
}

// update assignment
exports.updateAssignment = async (req, res) => {
  let result = await classes.assignmentUpdate(req)
  res.status(200).json(result)
}

// delete assignment
exports.deleteAssignment = async (req, res) => {
  let result = await classes.assignmentDelete(req)
  res.status(200).json(result)
}

// get assignment by id
exports.getAssignmentById = async (req, res) => {
  let result = await classes.getAssignment(req)
  res.status(200).json(result)
}



// create live class
exports.createLive = async (req, res) => {
  let result = await classes.liveCreate(req)
  res.status(200).json(result)
}

// update live class
exports.updateLive = async (req, res) => {
  let result = await classes.liveUpdate(req)
  res.status(200).json(result)
}

// delete live class
exports.deleteLive = async (req, res) => {
  let result = await classes.liveDelete(req)
  res.status(200).json(result)
}

// get live class
exports.getLiveId = async (req, res) => {
  let result = await classes.getLiveId(req)
  res.status(200).json(result)
}

// get all live class
exports.getAllLives = async (req, res) => {
  let result = await classes.getLives(req)
  res.status(200).json(result)
}