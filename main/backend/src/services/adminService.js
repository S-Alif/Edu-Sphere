const database = require('../../database')
const { v4 } = require('uuid')
const { encryptPass, comparePass } = require('../helpers/passEncryptor')
const { getCurrentDate } = require('../helpers/helper')


// register
exports.registerAdmin = async (req) => {
  try {
    let uid = v4()
    let query = "INSERT INTO `admin` (`id`, `firstName`, `lastName`, `email`, `pass`, `phone`, `date`, `address`, `profileImg`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"

    // encrypt password
    let enPass = encryptPass(req.body.pass)

    let data = [uid, req.body.firstName, req.body.lastName, req.body.email, enPass, req.body.phone, getCurrentDate(), req.body.address, req.body.profileImg]

    let result = await database.execute(query, data)

    return { status: 1, code: 200, data: "account created" }

  } catch (error) {
    return { status: 0, code: 200, data: "could not create account", errorCode: error };
  }
}

// login
exports.loginAdmin = async (req) => {
  try {
    let query = `SELECT id, pass, role, email FROM admin where email = "${req.body.email}";`
    let result = await database.execute(query)

    // compare pass
    let password = result[0][0]
    let compPass = await comparePass(password.pass, req.body.pass)

    if (compPass) {
      return { status: 1, code: 200, data: result[0][0] }
    }
    return { status: 0, code: 200, data: "invalid password" }

  } catch (error) {
    return { status: 0, code: 200, data: "could not log in", errorCode: error };
  }
}

// update
exports.updateAdmin = async (req) => {
  try {
    let query = `UPDATE admin SET firstName = ?, lastName = ?, phone = ?, address = ?, profileImg = ? WHERE (id = "${req.headers.id}");`

    let data = [req.body.firstName, req.body.lastName, req.body.phone, req.body.address, req.body.profileImg]

    let result = await database.execute(query, data)
    return { status: 1, code: 200, data: "account updated" }

  } catch (error) {
    return { status: 0, code: 200, data: "could not update account", errorCode: error };
  }
}

// delete
exports.deleteAdmin = async (req) => {
  try {
    let query = `DELETE FROM admin WHERE (id = "${req.headers.id}");`

    let result = await database.execute(query)
    return { status: 1, code: 200, data: "account deleted" }

  } catch (error) {
    return { status: 0, code: 200, data: "could not delete account", errorCode: error };
  }
}

// get profile
exports.getProfile = async (req) => {
  try {
    let query = `SELECT id, firstName, lastName, email, phone, role, date, address, profileImg FROM admin WHERE id = "${req.headers.id}";`

    let result = await database.execute(query)
    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "could not find account", errorCode: error };
  }
}