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