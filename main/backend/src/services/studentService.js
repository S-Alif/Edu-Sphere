const database = require('../../database')
const { v4 } = require('uuid')

// create
exports.create = async (req) => {
  try {
    let uniqueId = v4();
    let string = "INSERT INTO `eduspshere`.`students` (`id`, `firstName`, `lastName`, `email`, `pass`, `phone`, `profileImg`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    let data = [uniqueId, req.body.firstName, req.body.lastName, req.body.email, req.body.pass, req.body.phone, req.body.profileImg];

    let result = await database.execute(string, data)
    return { status: 1, code: 200, data: "account created" }

  } catch (error) {
    return { status: 0, code: 200, data: "could not create account", errorCode: error.code };
  }
}

// login
exports.login = async (req) => {
  try {

  } catch (error) {

  }
}

// update
exports.update = async (req) => {
  try {

  } catch (error) {

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