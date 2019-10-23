const assert = require('assert')
const JwtStrategy = require('passport-jwt').Strategy
const User = require('../../http/models/user')

assert(process.env.JWT_SECRET)

module.exports = () => {
  const jwtFromRequest = (req) => {
    let token = null
    if (req && req.cookies) {
      token = req.cookies.get('token')
    }
    return token
  }

  return new JwtStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest
  }, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id)
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    } catch (err) {
      console.error(err)
      return done(err, false)
    }
  })
}
