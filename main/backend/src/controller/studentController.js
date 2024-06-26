const { cookieMaker } = require('../helpers/helper');
const student = require('../services/studentService')

// registration
exports.registerStudent = async (req, res) => {
  const result = await student.create(req);
  res.status(200).json(result);
}

// login account
exports.loginAccount = async (req, res) => {
  const result = await student.login(req);

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

// updating account
exports.updateAccount = async (req, res) => {
  const result = await student.update(req);
  res.status(200).json(result);
}

// deleting account
exports.deleteAccount = async (req, res) => {
  const result = await student.delete(req);
  res.status(200).json(result);
}

// updating account
exports.getAccount = async (req, res) => {
  const result = await student.getData(req);
  res.status(200).json(result);
}