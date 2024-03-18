const database = require('../../database')
const { v4 } = require('uuid')
const { getCurrentDateTime } = require('../helpers/helper')

// create
exports.create = async (req) => {
  try {
    let instructorId = req.headers.id
    if (!instructorId) return { status: 100, code: 200, data: "Instructor ID not found. Log in again" }

    // check for data
    if (!req.body?.name || !req.body?.detail || !req.body?.forClass || !req.body?.subject || !req.body?.duration || !req.body?.classDay || !req.body?.classTime || !req.body?.preRequisite || !req.body?.price || !req.body?.discount) return { status: 0, code: 200, data: "Fill all the data" }

    let uid = v4()
    let query = "INSERT INTO course (id, name, detail, instructor, duration, preRequisite, createdAt, updatedAt, classDay, classTime, subject, price, discount, forClass, published) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?);"

    let data = [uid, req.body?.name, req.body?.detail, instructorId, req.body?.duration, req.body?.preRequisite, getCurrentDateTime(), getCurrentDateTime(), req.body?.classDay, req.body?.classTime, req.body?.subject, req.body?.price, req.body?.discount, req.body?.forClass, parseInt(req.body?.published)]

    let result = await database.execute(query, data)

    if (result[0]['affectedRows'] == 1) return { status: 1, code: 200, data: "course created" }

    return { status: 0, code: 200, data: "could not create course" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// update
exports.update = async (req) => {
  try {
    let insId = req.headers?.id

    let query = `UPDATE course SET name = ?, forClass = ?, subject = ?, detail = ?, duration = ?, classDay = ?, classTime = ?, preRequisite = ?, price = ?, discount = ?, updatedAt = ?, published = ? WHERE id = "${req.params.id}" and instructor = "${insId}";`;

    let data = [req.body?.name, req.body?.forClass, req.body?.subject, req.body?.detail, req.body?.duration, req.body?.classDay, req.body?.classTime, req.body?.preRequisite, req.body?.price, req.body?.discount, getCurrentDateTime(), parseInt(req.body?.published)]
    let result = await database.execute(query, data)

    return { status: 1, code: 200, data: "course updated" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// delete
exports.delete = async (req) => {
  try {

  } catch (error) {

  }
}

// get course by id
exports.courseById = async (req) => {
  try {
    let courseid = req.params.id
    let query = `SELECT * FROM course WHERE id = '${courseid}';`
    let result = await database.execute(query)
    
    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// get all course
exports.getAllCourse = async (req) => {
  try {

  } catch (error) {

  }
}

// get course by instructor
exports.getCourseByInstructor = async (req) => {
  try {

  } catch (error) {

  }
}

// get course by subject
exports.getCourseBySubject = async (req) => {
  try {

  } catch (error) {

  }
}

// get course by class
exports.getCourseByClass = async (req) => {
  try {

  } catch (error) {

  }
}

// get course names
exports.getCourseNames = async (req) => {
  try {
    let instructorId = req.headers.id
    if (!instructorId) instructorId = req.params.id
    if (!instructorId) return { status: 100, code: 200, data: "Instructor ID not found" }

    let query = `SELECT id, name FROM course WHERE instructor = '${instructorId}';`
    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}