const database = require('../../database')
const { v4 } = require('uuid');
const { encryptPass, comparePass } = require('../helpers/passEncryptor');
const { getCurrentDateTime } = require('../helpers/helper');


// create
exports.create = async (req) => {
  try {
    let uid = v4();
    let query = "INSERT INTO instructor (id, firstName, lastName, email, pass, phone, profileImg, registerDate, updateDate, sub1, sub2, address, forClass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    let enPass = encryptPass(req.body.pass)
    let date = getCurrentDateTime()

    let data = [uid, req.body.firstName, req.body.lastName, req.body.email, enPass, req.body.phone, req.body.profileImg, date, date, req.body.sub1, req.body.sub2, req.body.address, req.body.forClass];

    let result = await database.execute(query, data)

    return { status: 1, code: 200, data: "account created" }

  } catch (error) {
    return { status: 0, code: 200, data: "could not create account", errorCode: error };
  }
}


// login
exports.login = async (req) => {
  try {
    let query = `SELECT id, pass, role, email FROM instructor WHERE email = '${req.body.email}' and active = 1;`;

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
    return { status: 0, code: 200, data: "something went wrong", error: error };
  }
}


// update
exports.update = async (req) => {
  try {

    if (req.headers.role == 1) {
      let query = "UPDATE instructor SET firstName = ?, lastName = ?, phone = ?, profileImg = ?, profileCover = ?, updateDate = ?, sub1 = ?, sub2 = ?, address = ?, forClass = ? WHERE id = ? AND active = 1";

      let data = [req.body.firstName, req.body.lastName, req.body.phone, req.body.profileImg, profileCover, getCurrentDateTime(), req.body.sub1, req.body.sub2, req.body.address, req.body.forClass];

      let result = await database.execute(query, data)
      return { status: 1, code: 200, data: "Account updated" }
    }

    return { status: 0, code: 403, data: "Not Allowed" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}


// delete
exports.delete = async (req) => {
  try {

    if (req.headers.role == 1) {
      var id = req.headers.id
    }
    // for admin
    if (req.headers.role == "11") {
      id = req.params.id
    }

    let query = `UPDATE instructor SET active = 0, updateDate = ? WHERE id = ${id} and active = 1;`;
    let data = [getCurrentDateTime(), req.headers.id]

    let result = await database.execute(query, data)

    if (result[0]["affectedRows"] == 1) {
      return { status: 1, code: 200, data: "Account deleted" }
    }
    return { status: 0, code: 200, data: "could not delete account" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}


// get account
exports.getData = async (req) => {
  try {
    let id = req.params.id

    if (!id) {
      id = req.headers.id
    }

    let query = `SELECT id, firstName, lastName, email, phone, profileImg, profileCover, about, sub1, sub2, address, forClass, registerDate, updateDate FROM instructor WHERE id = '${id}';`

    let result = await database.execute(query)
    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}

// get all instructors
exports.getInstructors = async (req) => {
  try {

    let query = "SELECT id, firstName, lastName, email, phone, profileImg, profileCover, about, sub1, sub2, address, forClass, registerDate, updateDate FROM instructor;"

    let result = await database.execute(query)
    return { status: 1, code: 200, data: result[0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}