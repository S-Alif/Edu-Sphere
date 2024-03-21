const database = require('../../database')
const { v4 } = require('uuid');
const { encryptPass, comparePass } = require('../helpers/passEncryptor');
const { getCurrentDateTime } = require('../helpers/helper');
const { imageUploader, extractPublicId, imgDeleter } = require('../helpers/ImageUploader');


// register
exports.register = async (req) => {
  try {
    if (!req.body?.firstName || !req.body?.lastName || !req.body?.email || !req.body?.pass || !req.body?.phone || !req.body?.profileImg || !req.body?.role) return { status: 0, code: 200, data: "Fill all the data" };

    let uid = v4()
    let query = "INSERT INTO users (id, firstName, lastName, email, pass, phone, profileImg, registerDate, updateDate, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

    // encrypt password
    let enPass = encryptPass(req.body.pass)
    let date = getCurrentDateTime()

    let imageUrl = await imageUploader(req.body.profileImg)
    if (!imageUrl) return { status: 0, code: 200, data: "something went wrong" };

    let data = [uid, req.body.firstName, req.body.lastName, req.body.email, enPass, req.body.phone, imageUrl, date, date, parseInt(req.body.role)];

    let result = await database.execute(query, data)

    return { status: 1, code: 200, data: "account created" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// login
exports.login = async (req) => {
  try {
    if (!req.body?.email || !req.body?.pass) return { status: 0, code: 200, data: "Fill all the data" }

    let query = `SELECT id, pass, role, email FROM users WHERE email = '${req.body.email}' and active = 1;`;

    let result = await database.execute(query)

    if (result[0].length == 1) {
      let password = result[0][0]
      let compPass = await comparePass(password.pass, req.body.pass)

      if (compPass) {
        return { status: 1, code: 200, data: result[0][0] }
      }
      return { status: 0, code: 200, data: "invalid password" }
    }
    return { status: 0, code: 200, data: "No user found" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// update
exports.update = async (req) => {
  try {
    if (req.body?.newProfileImg != "") {
      let id = extractPublicId(req.body?.profileImg)
      let deleter = await imgDeleter(id)

      if (deleter == true) {
        let imageUrl = await imageUploader(req.body.newProfileImg)
        if (!imageUrl) return { status: 0, code: 200, data: "something went wrong" };
        req.body.profileImg = imageUrl
      } else {
        return { status: 0, code: 200, data: "could not update profile" }
      }
    }

    let query = `UPDATE users SET firstName = ?, lastName = ?, phone = ?, profileImg = ?, updateDate = ?, about = ?, address = ? WHERE id = '${req.headers?.id}' and active = 1;`
    let data = [req.body.firstName, req.body.lastName, req.body.phone, req.body.profileImg, getCurrentDateTime(), req.body?.about, req.body.address];

    let result = await database.execute(query, data)

    return { status: 1, code: 200, data: "account updated" }

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

// get all instructors
exports.instructors = async () => {
  try {

  } catch (error) {

  }
}

// instructor by id
exports.instructorById = async (req) => {
  try {

  } catch (error) {

  }
}

// user profile
exports.profile = async (req) => {
  try {
    let id = req.headers?.id
    let role = req.headers?.role

    let query = `SELECT id, firstName, lastName, email, phone, profileImg, about, address, registerDate, updateDate, role FROM users WHERE id = "${id}" AND role = ${role};`

    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// enroll in course
exports.enrollCourse = async (req) => {
  try {
    let uid = v4()
    if (!req.body?.courseId || !req.body?.batchId || !req.body?.studentId || !req.body?.paid) return { status: 0, code: 200, data: "Fill all the data" };

    let checkEnroll = await database.execute(`SELECT COUNT(*) as total FROM enrollment WHERE courseId = '${req.body?.courseId}' AND batchId = '${req.body?.batchId}';`)
    let total = checkEnroll[0][0]

    if (total?.total != 0) return { status: 0, code: 200, data: "Already enrolled in course" };


    let courseData = await database.execute(`SELECT price, discount FROM course WHERE id = '${req.body?.courseId}';`)
    let course = courseData[0][0]
    let fee = parseInt(course?.price) - parseInt(course?.discount)

    if ((fee - parseInt(req.body?.paid) != 0)) {
      return { status: 0, code: 200, data: "pay the required amount" };
    }

    let date = getCurrentDateTime()

    let query = `INSERT INTO enrollment (id, courseId, batchId, studentId, paid, payDue, enrollDate) VALUES (?,?,?,?,?,?,?);`
    let data = [uid, req.body?.courseId, req.body?.batchId, req.body?.studentId, req.body?.paid, "0", date]

    let result = await database.execute(query, data)

    if (result[0]['affectedRows'] == 1) {

      let newUid = v4()
      let query2 = `INSERT INTO student_payment (id, studentId, enrollId, paid, date) VALUES (?,?,?,?,?);`
      let data2 = [newUid, req.body?.studentId, uid, req.body?.paid, date]
      let result2 = await database.execute(query2, data2)

      return { status: 1, code: 200, data: "course enroll success" }
    }

    return { status: 1, code: 200, data: "course enroll failed" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}


// fetch student enrolled courses
exports.fetchEnrollCourse = async (req) => {
  try {

    let id = req.params?.id

    let query = `SELECT 
        e.courseId AS courseId,
        e.batchId AS batchId,
        c.name AS courseName,
        c.price AS price,
        c.forClass AS class,
        b.name AS batchName,
        b.courseBatchImg AS batchImg,
        b.start AS batchEnroll,
        s.name AS subjectName,
        i.firstName AS instructorFname,
        i.lastName AS instructorLname,
        i.profileImg AS instructorImg
    FROM enrollment e
    JOIN course c ON e.courseId = c.id
    JOIN batch b ON e.batchId = b.id
    JOIN users i ON c.instructor = i.id
    JOIN subject s ON c.subject = s.id
    WHERE e.studentId = '${id}';`

    let result = await database.execute(query)
    return { status: 1, code: 200, data: result[0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// submit assignment
exports.submitAssignment = async (req) => {
  try {
    if (!req.body?.studentId || !req.body?.assignmentId || !req.body?.sub_assignment) return { status: 0, code: 200, data: "submit assignment properly" }

    let checks = await database.execute(`SELECT COUNT(*) as total FROM assignment_submits WHERE studentId = '${req.body?.studentId}' AND assignmentId = '${req.body?.assignmentId}';`)

    let total = checks[0][0]

    if (total.total > 0) return { status: 0, code: 200, data: "assignment already submitted" }

    // pdf uploader
    let url = await pdfUploader(req.body?.sub_assignment)
    if (!url) return { status: 0, code: 200, data: "could not submit assignment" }

    let uid = v4()
    let query = `INSERT INTO assignment_submits (id, studentId, assignmentId, sub_assignment, date) VALUES(?,?,?,?,?);`
    let data = [uid, req.body?.studentId, req.body?.assignmentId, url, getCurrentDateTime()]

    let result = await database.execute(query, data)

    return { status: 1, code: 200, data: "submitted assignment" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// student payment
exports.studentPayment = async (req) => {
  try {
    let id = req.headers?.id
    let query = `SELECT 
        course.name AS courseName,
        batch.name AS batchName,
        enrollment.paid AS paid,
        enrollment.enrollDate AS enrollDate
    FROM enrollment
    INNER JOIN course ON enrollment.courseId = course.id
    INNER JOIN batch ON enrollment.batchId = batch.id
    WHERE enrollment.studentId = '${id}';`

    let result = await database.execute(query)
  
    return { status: 1, code: 200, data: result[0]};
  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}