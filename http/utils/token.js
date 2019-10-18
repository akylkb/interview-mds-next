const assert = require('assert')
const jwt = require('jsonwebtoken')

assert(process.env.JWT_SECRET)

module.exports.encode = ({ id }) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  return token
}
