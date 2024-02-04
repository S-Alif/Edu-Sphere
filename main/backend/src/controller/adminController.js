const { cookieMaker } = require('../helpers/helper')
const admin = require('../services/adminService')


// register
exports.register = async (req, res) => {
  let result = await admin.registerAdmin(req)
  res.status(200).json(result)
}

// login 
exports.login = async (req, res) => {
  let result = await admin.loginAdmin(req)

  if(result.status == 1){
    let cookie = cookieMaker({
      email: result['data']['email'],
      id: result['data']['id'],
      role: result['data']['role']
    })

    res.status(200).cookie("token", cookie.token, cookie.cookieOption).json({
      status: result['status'],
      code: result['code'],
      data: {
        uid: result.data['id'],
        role: result.data['role']
      }
    })

    return
  }

  res.status(200).json(result);
}

// update
exports.update = async (req, res) => {
  let result = await admin.updateAdmin(req)
  res.status(200).json(result)
}

// delete
exports.delete = async (req, res) => {
  let result = await admin.deleteAdmin(req)
  res.status(200).json(result)
}

// get admin profile
exports.profile = async (req, res) => {
  let result = await admin.getProfile(req)
  res.status(200).json(result)
}

// logout
exports.logout = async (req, res) => {

  let cookieOption = {
    expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
    httpOnly: false
  }
  res.cookie('token', "", cookieOption);
  res.status(201).json({ status: 1, code: 200, data: "logout successfull" });
}