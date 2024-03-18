const subject = require('../services/subjectService')

//subject create
exports.subjectCreate = async (req,res) => {
    let result = await subject.create(req)
    res.status(200).json(result)
}

//subject update
exports.subjectUpdate = async (req,res) => {
    let result = await subject.update(req)
    res.status(200).json(result)
}

//subject delete
exports.subjectDelete = async (req,res) => {
    let result = await subject.delete(req)
    res.status(200).json(result)
}

//get all subject
exports.getAllSubject = async (req,res) => {
    let result = await subject.getSubjects(req)
    res.status(200).json(result)
}

// get class
exports.classes = async (req, res) => {
    let result = await subject.getClasses(req)
    res.status(200).json(result)
}

// subject by instructor
exports.getSubByInstructor = async (req, res) => {
    let result = await subject.subByInstructor(req)
    res.status(200).json(result)
}