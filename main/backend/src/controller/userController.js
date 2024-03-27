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

// send otp mail
exports.mailSend = async (req, res) => {
  let result = await userService.otpMail(req)
  res.status(200).json(result);
}

// verify otp Mail
exports.verifyOtpMail = async (req, res) => {
  let result = await userService.otpMailVerify(req)
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

// user password update
exports.userPassUpdate = async (req, res) => {
  let result = await userService.changePass(req)
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

// user profile
exports.userProfile = async (req, res) => {
  let result = await userService.profile(req)
  res.status(200).json(result);
}


// course enroll
exports.courseEnroll = async (req, res) => {
  let result = await userService.enrollCourse(req)
  res.status(200).json(result);
}

// fetch student enrolled course
exports.studentEnrollCourse = async (req, res) => {
  let result = await userService.fetchEnrollCourse(req)
  res.status(200).json(result);
}

//student submit assignments
exports.AssignmentSubmit = async (req, res) => {
  let result = await userService.submitAssignment(req)
  res.status(200).json(result);
}

// student payment info
exports.studentPayInfo = async (req, res) => {
  let result = await userService.studentPayment(req)
  res.status(200).json(result);
}

// instructor payment info
exports.instructorPayInfo = async (req, res) => {
  let result = await userService.instructorPayment(req)
  res.status(200).json(result);
}

// user by email
exports.userByEmail = async (req, res) => {
  let result = await userService.getUserByEmail(req)
  res.status(200).json(result);
}