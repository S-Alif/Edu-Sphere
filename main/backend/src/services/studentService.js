const database = require('../../database')
const { v4 } = require('uuid')
const { encryptPass, comparePass } = require('../helpers/passEncryptor');
const { getCurrentDateTime } = require('../helpers/helper');
const { imageUploader } = require('../helpers/ImageUploader');

// create
exports.create = async (req) => {
  try {
    let uniqueId = v4();
    let string = "INSERT INTO `student` (`id`, `firstName`, `lastName`, `email`, `pass`, `phone`, `profileImg`, `registerDate`, `updateDate`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // encrypt password
    let enPass = encryptPass(req.body.pass)
    let date = getCurrentDateTime()

    let imageUrl = await imageUploader(req.body.profileImg)

    let data = [uniqueId, req.body.firstName, req.body.lastName, req.body.email, enPass, req.body.phone, imageUrl, date, date];

    let result = await database.execute(string, data)
    return { status: 1, code: 200, data: "account created" }

  } catch (error) {
    return { status: 0, code: 200, data: "could not create account", errorCode: error };
  }
}

// login
exports.login = async (req) => {
  try {
    let query = `SELECT id, pass, role, email FROM student WHERE email = '${req.body.email}' and active = 1;`;

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
    return { status: 0, code: 200, data: "something went wrong" };
  }
}

// update
exports.update = async (req) => {
  try {
    if (req.headers.role == 0) {
      let query = "UPDATE student SET firstName = ?, lastName = ?, phone = ?, profileImg = ?, updateDate = ? WHERE id = ? and active = 1;";
      let data = [req.body.firstName, req.body.lastName, req.body.phone, req.body.profileImg, getCurrentDateTime(), req.headers.id]

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
    if(req.headers.role == 0){
      var id = req.headers.id
    }
    // for admin
    if (req.headers.role == "11") {
      id = req.body.stdId
    }

    let query = `UPDATE student SET active = 0, updateDate = ? WHERE id = ${id} and active = 1;`;
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

// get data
exports.getData = async (req) => {
  try {
    if (req.headers.role == 0) {
      var id = req.headers.id
    }
    // for admin
    if (req.headers.role == "11") {
      id = req.body.stdId
    }
    let query = `SELECT id, firstName, lastName, email, phone, profileImg, registerDate, updateDate FROM student WHERE id = '${id}';`

    let result = await database.execute(query)
    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error }
  }
}