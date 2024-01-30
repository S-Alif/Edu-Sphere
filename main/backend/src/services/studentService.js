const database = require('../../database')
const { v4 } = require('uuid')
const { encryptPass, comparePass } = require('../helpers/passEncryptor');

// create
exports.create = async (req) => {
  try {
    let uniqueId = v4();
    let string = "INSERT INTO `eduspshere`.`students` (`id`, `firstName`, `lastName`, `email`, `pass`, `phone`, `profileImg`) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // encrypt password
    let enPass = encryptPass(req.body.pass)

    let data = [uniqueId, req.body.firstName, req.body.lastName, req.body.email, enPass, req.body.phone, req.body.profileImg];

    let result = await database.execute(string, data)
    return { status: 1, code: 200, data: "account created" }

  } catch (error) {
    return { status: 0, code: 200, data: "could not create account", errorCode: error.code };
  }
}

// login
exports.login = async (req) => {
  try {
    let query = `SELECT \`id\`, \`pass\`, \`role\`, \`email\` FROM \`eduspshere\`.\`students\` WHERE \`email\` = '${req.body.email}';`;

    let result = await database.execute(query)

    // compare pass
    let password = result[0][0]
    let compPass = await comparePass(password.pass, req.body.pass)

    if(compPass){
      return { status: 1, code: 200, data: result[0][0] }
    }
    return { status: 0, code: 200, data: "invalid password" }

  } catch (error) {
    return { status: 0, code: 200, data: "could not log in", errorCode: error };
  }
}

// update
exports.update = async (req) => {
  try {
    let query = "UPDATE students SET firstName = ?,lastName = ?, phone = ?, profileImg = ? WHERE id = ?";
    let data = [req.body.firstName, req.body.lastName, req.body.phone, req.body.profileImg, req.headers.id]

    let result = await database.execute(query, data)
    return { status: 1, code: 200, data: "Account updated" }

  } catch (error) {
    return { status: 1, code: 200, data: "could not update account", errorCode: error }
  }
}

// delete
exports.delete = async (req) => {
  try {

  } catch (error) {

  }
}

// get data
exports.getData = async (req) => {
  try {

  } catch (error) {

  }
}