const { cookieMaker } = require('../helpers/helper');
const instructor = require('../services/instructorService')

// registration
exports.registerInstructor = async (req, res) => {
    const result = await instructor.create(req);
    res.status(200).json(result);
}

// login account
exports.loginAccount = async (req, res) => {
  const result = await instructor.login(req);

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
    const result = await instructor.update(req);
    res.status(200).json(result);
}

// deleting account
exports.deleteAccount = async (req, res) => {
    const result = await instructor.delete(req);
    res.status(200).json(result);
}

// updating account
exports.getAccount = async (req, res) => {
    const result = await instructor.getData(req);
    res.status(200).json(result);
}

// get all instructors
exports.getAllInstructors = async (req, res) => {
  let result = await instructor.getInstructors(req)
  res.status(200).json(result)
}