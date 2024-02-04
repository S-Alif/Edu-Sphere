const { verifyToken } = require("../helpers/tokenHelper")


module.exports = async (req, res, next) => {
  let token = req.headers['token']
  if (!token) {
    token = req.cookies['token']
  }

  if (token) {
    let decoded = await verifyToken(token)
    if (!decoded) {
      res.status(401).json({status: 0, code: 401, data: "unauthorised"})
      return
    }
    else {
      req.headers.email = decoded['email']
      req.headers.id = decoded['id']
      req.headers.role = decoded['role']
      next()
    }
  }
  else {
    res.status(401).json({ status: 0, code: 401, data: "token not found" })
  }
}