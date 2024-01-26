const bcrypt = require('bcrypt')

// encrypting password
exports.encryptPass = (pass) => {
  let password = bcrypt.hashSync(pass, 12)
  return password
}

// compare encrypted pass
exports.comparePass = async (enPass, pass) => {
  let result = await bcrypt.compare(pass, enPass)
  return result
}