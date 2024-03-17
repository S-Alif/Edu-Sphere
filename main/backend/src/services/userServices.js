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
    let query = "INSERT INTO users (id, firstName, lastName, email, pass, phone, registerDate, updateDate, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"

    // encrypt password
    let enPass = encryptPass(req.body.pass)
    let date = getCurrentDateTime()

    let data = [uid, req.body.firstName, req.body.lastName, req.body.email, enPass, req.body.phone, date, date, req.body.role];

    let result = await database.execute(query, data)

    if (result[0]['affectedRows'] == 1) {
      let imageUrl = await imageUploader(req.body.profileImg)
      if (!imageUrl) return { status: 0, code: 200, data: "something went wrong" };
      let getData = await database.execute(`update users set profileImg = '${imageUrl}' where id = "${uid}"`)
      return { status: 1, code: 200, data: "account created" }
    }

    return { status: 0, code: 200, data: "could not create account" }

  } catch (error) {
    console.log(error)
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
    if (req.body?.newProfileImg != ""){
      let id = extractPublicId(req.body?.profileImg)
      let deleter = await imgDeleter(id)

      if(deleter == true){        
        let imageUrl = await imageUploader(req.body.newProfileImg)
        if (!imageUrl) return { status: 0, code: 200, data: "something went wrong" };
        req.body.profileImg = imageUrl
      }else{
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

// insert instructors subjects
exports.pushInstructorsSubs = async (req) => {
  try {
    let uid = v4()


  } catch (error) {

  }
}

// delete instructor subjects
exports.deleteInstructorSubs = async (req) => {
  try {

  } catch (error) {

  }
}

// get instructor subjects
exports.instructorSubs = async (req) => {
  try {
    let insId = req.headers?.id
    if (!insId) {
      insId = req.params?.id
    }



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