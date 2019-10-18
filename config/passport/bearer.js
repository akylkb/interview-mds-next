const assert = require('assert')
const BearerStrategy = require('passport-http-bearer').Strategy

assert(process.env.JWT_SECRET)

module.exports = () => {
  return new BearerStrategy((token, done) {
    
  })
}