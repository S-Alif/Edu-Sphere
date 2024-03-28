const database = require('../../database')
const { v4 } = require('uuid')
const { getCurrentDateTime } = require('../helpers/helper')

/*-------------------------------
    Instructor review
---------------------------------- */

// create
exports.postInstructorReview = async (req) => {
  try {
    let uid = v4()
    let query = `INSERT INTO instructor_review (id, studentId, instructorId, review, createdAt) VALUES (?,?,?,?,?);`
    let data = [uid, req.headers?.id, req.body?.instructorId, req.body?.review, getCurrentDateTime()]

    await database.execute(query, data)

    return { status: 1, code: 200, data: "review posted" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// delete
exports.deleteInstructorReview = async (req) => {
  try {

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// get reviews
exports.getInstructorReview = async (req) => {
  try {
    let instructorId = req.params?.id

    let query = `SELECT ir.*, u.profileImg AS profileImg, u.firstName AS firstName, u.lastName AS lastName
    FROM instructor_review AS ir
    JOIN users AS u ON ir.studentId = u.id
    WHERE ir.instructorId = '${instructorId}';`

    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}


/*-------------------------------
    course review
---------------------------------- */

// create
exports.postCourseReview = async (req) => {
  try {
    let uid = v4()

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// delete
exports.deleteCourseReview = async (req) => {
  try {

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// get reviews
exports.getCourseReview = async (req) => {
  try {

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}


/*-------------------------------
  site review
---------------------------------- */

// create
exports.postSiteReview = async (req) => {
  try {
    let uid = v4()

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// delete
exports.deleteSiteReview = async (req) => {
  try {

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// get reviews
exports.getSiteReview = async (req) => {
  try {

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}