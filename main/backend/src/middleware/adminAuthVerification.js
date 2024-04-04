const { verifyToken } = require("../helpers/tokenHelper")


module.exports = async (req, res, next) => {
  try {
    let token = req.headers['token']
    if (!token) {
      token = req.cookies['token']
    }

    if (token) {
      let decoded = await verifyToken(token)
      if (!decoded) {
        res.status(401).json({ status: 0, code: 401, data: "unauthorised" })
        return
      }
      else {
        if (decoded['role'] == 11) {
          req.headers.email = decoded['email']
          req.headers.id = decoded['id']
          req.headers.role = decoded['role']
          next()
          return
        }
        res.status(401).json({ status: 0, code: 403, data: "Admin Access Needed" })
      }

      return
    }
    res.status(401).json({ status: 0, code: 401, data: "token not found" })
  } catch (error) {
    res.status(401).json({ status: 0, code: 500, data: "Internal Server Error" })
  }
}