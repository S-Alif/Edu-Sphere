const modules = require('../services/moduleService')

exports.moduleCreate = async (req, res) => {
  let result = await modules.create(req)
  res.status(200).json(result)
}

exports.moduleUpdate = async (req, res) => {
  let result = await modules.update(req)
  res.status(200).json(result)
}

exports.moduleDelete = async (req, res) => {
  let result = await modules.delete(req)
  res.status(200).json(result)
}

exports.getModuleById = async (req, res) => {
  let result = await modules.moduleById(req)
  res.status(200).json(result)
}

exports.getAllModule = async (req, res) => {
  let result = await modules.modules(req)
  res.status(200).json(result)
}