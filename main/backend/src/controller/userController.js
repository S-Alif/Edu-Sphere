const { cookieMaker } = require("../helpers/helper");
const userService = require("../services/userServices")

// register
exports.userRegister = async (req, res) => {
  let result = await userService.register(req)
  res.status(200).json(result);
}

// user login
exports.userLogin = async (req, res) => {
  let result = await userService.login(req)
  if (result.status == 1) {
    let cookie = cookieMaker({
      email: result['data']['email'],
      id: result['data']['id'],
      role: result['data']['role']
    })

    return res.status(200).cookie("token", cookie.token, cookie.cookieOption).json({
      status: result['status'],
      code: result['code'],
      data: {
        uid: result.data['id'],
        role: result.data['role']
      }
    })
  }

  res.status(200).json(result);
}

// user logout
exports.userLogout = async (req, res) => {
  let cookieOption = {
    expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
    httpOnly: false
  }
  res.cookie('token', "", cookieOption);
  res.status(200).json({ status: 1, code: 200, data: "logout successfull" });
}

// user update
exports.userUpdate = async (req, res) => {
  let result = await userService.update(req)
  res.status(200).json(result);
}

// user delete
exports.userDelete = async (req, res) => {
  let result = await userService.delete(req)
  res.status(200).json(result);
}

// get instructors
exports.getInstructors = async (req, res) => {
  let result = await userService.instructors(req)
  res.status(200).json(result);
}

// instructor by id
exports.getInstructorsById = async (req, res) => {
  let result = await userService.delete(req)
  res.status(200).json(result);
}

// insert instructors subjects
exports.insertInstructorSubs = async (req, res) => {
  let result = await userService.pushInstructorsSubs(req)
  res.status(200).json(result);
}

// delete instructor subjects
exports.removeInstructorSubs = async (req, res) => {
  let result = await userService.deleteInstructorSubs(req)
  res.status(200).json(result);
}

// get instructor subjects
exports.getInstructorSubs = async (req, res) => {
  let result = await userService.instructorSubs(req)
  res.status(200).json(result);
}

// user profile
exports.userProfile = async (req, res) => {
  let result = await userService.profile(req)
  res.status(200).json(result);
}