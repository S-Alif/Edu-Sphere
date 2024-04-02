const { createToken } = require("./tokenHelper")

// cookie maker
exports.cookieMaker = (data) => {
  let cookieOption = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: false,
    sameSite: "none",
    secure: true
  }

  return { token: createToken(data), cookieOption }
}

// datetime format
exports.getCurrentDateTime = () => {
  const currentDate = new Date()
  currentDate.setHours(currentDate.getHours() + 6);
  const sqlDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ')
  return sqlDateTime
}

// date format
exports.getCurrentDate = () => {
  let date = new Date().toISOString().split('T')[0]
  return date
}