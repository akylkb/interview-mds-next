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
    console.log('jwtPayload', jwtPayload)
    // User.findOne({ id: jwtPayload.sub }, function (err, user) {
    //   if (err) {
    //     return done(err, false)
    //   }
    //   if (user) {
    //     return done(null, user)
    //   } else {
    //     return done(null, false)
    //     // or you could create a new account
    //   }
    // })
    done(null, false)
  })
}
