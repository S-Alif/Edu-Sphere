const batch = require("../services/batchServices")


exports.batchCreate = async (req, res) => {
  let result = await batch.create(req)
  res.status(200).json(result)
}

exports.batchUpdate = async (req, res) => {
  let result = await batch.update(req)
  res.status(200).json(result)
}

exports.batchDelete = async (req, res) => {
  let result = await batch.delete(req)
  res.status(200).json(result)
}

exports.getBatchByInstructor = async (req, res) => {
  let result = await batch.getBatch(req)
  res.status(200).json(result)
}

exports.getBatchById = async (req, res) => {
  let result = await batch.batchByID(req)
  res.status(200).json(result)
}
