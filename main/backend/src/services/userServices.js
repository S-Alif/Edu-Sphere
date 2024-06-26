const database = require('../../database')
const { v4 } = require('uuid');
const { encryptPass, comparePass } = require('../helpers/passEncryptor');
const { getCurrentDateTime, getCurrentDate } = require('../helpers/helper');
const { imageUploader, extractPublicId, imgDeleter, pdfUploader } = require('../helpers/ImageUploader');
const sendEmail = require('../utility/sendMail');
const { otp_markup } = require('../utility/markups');

const fs = require('fs')
const path = require('path')


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

    if (parseInt(req.body.role) == 1) {
      let result2 = await database.execute(`INSERT INTO instructor_approved (id, instructorId) VALUES ('${v4()}', '${uid}');`)
    }

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

    if (req.headers?.role == 1) {
      let result2 = await database.execute(`UPDATE instructor_approved SET education = '${req.body?.education}', currentStats = '${req.body?.currentStats}' WHERE instructorId = '${req.headers?.id}';`)
    }

    return { status: 1, code: 200, data: "account updated" }

  } catch (error) {
    console.log(error)
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
exports.instructors = async (req) => {
  try {

    let filter = req.params?.filter

    let query = `
      SELECT 
        u.id AS instructor_id,
        u.firstName AS first_name,
        u.lastName AS last_name,
        u.email AS email,
        u.phone AS phone,
        u.profileImg AS profile_image,
        u.registerDate AS register_date,
        u.verified AS verified
      FROM 
        users u
      LEFT JOIN 
        instructor_approved ia ON u.id = ia.instructorId
      WHERE 
        u.role = 1 `;

    if (filter === "notApproved") {
      query += ` AND ia.approved = 0`;
    }
    if (filter === "active") {
      query += ` AND u.active = 1`;
    }
    if (filter === "inActive") {
      query += ` AND u.active = 0`;
    }

    query += ` ORDER BY u.registerDate ASC`

    let result = await database.execute(query)
    return { status: 1, code: 200, data: result[0] };

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// approve instructor
exports.approveInstructor = async (req) => {
  try {
    let instructorId = req.params?.id
    let result = await database.execute(`UPDATE instructor_approved SET approved = 1 WHERE instructorId = '${instructorId}';`)

    let result2 = await database.execute(`SELECT email, firstName, lastName FROM users WHERE id = '${instructorId}';`)
    let data = result2[0][0]

    await sendEmail(data.email, `<h3>${data?.firstName} ${data?.lastName}</h3> <br> <p>Your account was approved. Please check your dashboard to see all the features</p>`, "Account approved")

    return { status: 1, code: 200, data: "Instructor approved" };

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// instructor by id
exports.instructorById = async (req) => {
  try {


  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// user profile
exports.profile = async (req) => {
  try {
    let id = req?.params?.id
    let role = req?.params?.role

    if (!id) id = req.headers?.id
    if (role == null) role = req.headers?.role

    let query = `SELECT id, firstName, lastName, email, phone, profileImg, about, address, registerDate, updateDate, role, verified FROM users WHERE id = "${id}" AND role = ${role};`
    let result = await database.execute(query)

    if(role == 1){
      let result2 = await database.execute(`SELECT education, currentStats, approved FROM instructor_approved WHERE instructorId = '${id}';`)
      result[0][0].education = result2[0][0].education
      result[0][0].currentStats = result2[0][0].currentStats
      result[0][0].approved = result2[0][0].approved
    }

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

    let checkEnroll = await database.execute(`SELECT COUNT(*) as total FROM enrollment WHERE courseId = '${req.body?.courseId}' AND batchId = '${req.body?.batchId}' AND studentId = '${req.body?.studentId}';`)
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

    return { status: 1, code: 200, data: result[0] };
  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// isntructor payment
exports.instructorPayment = async (req) => {
  try {
    let id = req.headers?.id;
    let courseId = req.params?.courseId;

    let query = `SELECT 
        users.firstName AS stdFname,
        users.lastName AS stdLname,
        users.profileImg AS stdImg,
        course.name AS courseName,
        batch.name AS batchName,
        enrollment.paid,
        enrollment.enrollDate
    FROM enrollment
    INNER JOIN users ON enrollment.studentId = users.id
    INNER JOIN batch ON enrollment.batchId = batch.id
    INNER JOIN course ON batch.courseId = course.id
    WHERE course.instructor = '${id}'`;

    if (courseId != 0) {
      query += ` AND course.id = '${courseId}'`;
    }

    let result = await database.execute(query);

    return { status: 1, code: 200, data: result[0] };
  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// otp Mail
exports.otpMail = async (req) => {
  try {
    let emailId = req.body?.email
    let type = req.body?.type

    let checkUser = await database.execute(`SELECT COUNT(*) as total FROM users WHERE email = '${emailId}';`)
    let total = checkUser[0][0]

    if (total?.total == 0) return { status: 0, code: 200, data: "no user exist" }

    // otp
    let otp = Math.floor(100000 + Math.random() * 900000);
    let uid = v4()
    let otpDbInsertQuery = "INSERT INTO otp (id, otpCode, email) VALUES (?,?,?);"
    let otpData = [uid, otp, emailId]
    let insertOtp = await database.execute(otpDbInsertQuery, otpData)

    // mail sending
    let mail = await sendEmail(emailId, otp_markup(otp), `${type == 0 ? "Please verify your account" : "Verify email for password"}`)

    return { status: 1, code: 200, data: "verification email sent" }
  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// otp verify
exports.otpMailVerify = async (req) => {
  try {
    let emailId = req.body?.email
    let otp = req?.body?.otpCode

    let checKOtpStatus = await database.execute(`SELECT COUNT(*) as total FROM otp WHERE email = '${emailId}' AND otpCode = '${otp}' AND verified = 0;`)
    let total = checKOtpStatus[0][0]

    if (total?.total != 1) return { status: 0, code: 200, data: "Invalid Otp" }

    await database.execute(`UPDATE otp SET verified = 1 WHERE email = '${emailId}' AND otpCode = '${otp}' AND verified = 0;`)
    await database.execute(`UPDATE users SET verified = 1 WHERE email = '${emailId}' AND verified = 0;`)

    return { status: 1, code: 200, data: "Account verified" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// change pass
exports.changePass = async (req) => {
  try {
    let email = req.headers?.email
    if (!email) email = req.body?.email
    let currentPass = req.body?.currentPass

    if (currentPass && req.headers?.email) {
      let query = `SELECT pass FROM users WHERE email = '${email}' and active = 1;`;
      let result = await database.execute(query)
      let passCompare = await comparePass(result[0][0].pass, currentPass)

      if (passCompare) {
        let newPass = encryptPass(req.body?.newPass)
        await database.execute(`UPDATE users SET pass = '${newPass}' WHERE email = '${email}' and active = 1;`)
        await sendEmail(email, `<h1><b>Your password changed at ${getCurrentDate()}. </b></h1> <br> <p>If it is not done by you, please contact us immediately</p>`, "Account password updated")
        return { status: 1, code: 200, data: "password updated" }
      }

      return { status: 0, code: 200, data: "current password don't match" }
    }

    let newPass = encryptPass(req.body?.newPass)
    await database.execute(`UPDATE users SET pass = '${newPass}' WHERE email = '${email}' and active = 1;`)
    await sendEmail(email, `<h1><b>Your password changed at ${getCurrentDate()}. </b></h1> <br> <p>If it is not done by you, please contact us immediately</p>`, "Account password updated")
    return { status: 1, code: 200, data: "password updated" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

exports.getUserByEmail = async (req) => {
  try {
    let email = req.params?.email
    let query = `SELECT firstName, lastName, profileImg FROM users WHERE email = "${email}";`
    let result = await database.execute(query)

    if (result[0].length == 0) {
      return { status: 1, code: 200, data: "No user found" }
    }

    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// resourse upload
exports.resourseUpload = async (req) => {
  try {
    if (req.headers.role != 1) return { status: 0, code: 200, data: "No permission" }
    if (!req.body.name || !req.body.file) return { status: 0, code: 200, data: "fill all the data" }

    let fileUrl = await pdfUploader(req.body.file)
    if (!fileUrl) return { status: 0, code: 200, data: "could not upload resource" }

    let query = `INSERT INTO course_materials (id, instructorId, material_name, material) VALUES (?,?,?,?);`
    let data = [v4(), req.headers.id, req.body?.name, fileUrl]

    let result = await database.execute(query, data)

    return { status: 1, code: 200, data: "resource uploaded" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}

// get resources
exports.findResource = async (req) => {
  try {
    if (req.headers.role != 1) return { status: 0, code: 200, data: "No permission" }

    let id = req.headers?.id

    let query = `SELECT * FROM course_materials WHERE instructorId = '${id}';`
    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}

// delete resource
exports.deleteResource = async (req) => {
  try {
    if (req.headers.role != 1) return { status: 0, code: 200, data: "No permission" }

    let instructorId = req.headers?.id

    // check in modules
    let checks = await database.execute(`SELECT COUNT(*) as total FROM shared_materials WHERE materialId = '${req.params.id}';`)

    if (checks[0][0].total > 0) return { status: 0, code: 200, data: `resource is shared in ${checks[0][0].total} modules` }

    // delete file from server
    let filePath = await database.execute(`SELECT * FROM course_materials WHERE instructorId = '${instructorId}' AND id = '${req.params.id}';`)

    // delete data from database
    let query = `DELETE FROM course_materials WHERE instructorId = '${instructorId}' AND id = '${req.params.id}';`
    let result = await database.execute(query)

    fs.unlinkSync(path.join(__dirname, "../" + filePath[0][0]['material']))

    return { status: 1, code: 200, data: "resource deleted" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}

// add to module
exports.addResourseToModule = async (req) => {
  try {
    if (req.headers.role != 1) return { status: 0, code: 200, data: "No permission" }

    let moduleId = req.params?.module
    let materialId = req.params?.material

    let checks = await database.execute(`SELECT COUNT(*) as total FROM shared_materials WHERE materialId = '${materialId}' AND moduleId = '${moduleId}';`)

    if (checks[0][0].total == 1) return { status: 0, code: 200, data: "resource already added" }

    // delete data from database
    let query = `INSERT INTO shared_materials (id, materialId, moduleId) VALUES ('${v4()}', '${materialId}', '${moduleId}');`
    let result = await database.execute(query)

    return { status: 1, code: 200, data: "resource added to module" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}

// remove from module
exports.removeResourseFromModule = async (req) => {
  try {
    if (req.headers.role != 1) return { status: 0, code: 200, data: "No permission" }

    let moduleId = req.params?.module
    let materialId = req.params?.material

    // delete data from database
    let query = `DELETE FROM shared_materials WHERE materialId = '${materialId}' AND moduleId = '${moduleId}';`
    let result = await database.execute(query)

    return { status: 1, code: 200, data: "resource removed from module" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}

// module resources
exports.moduleResources = async (req) => {
  try {
    let moduleId = req.params?.module

    // delete data from database
    let query = `SELECT course_materials.*
    FROM course_materials
    JOIN shared_materials ON course_materials.id = shared_materials.materialId
    WHERE shared_materials.moduleId = '${moduleId}';`

    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}