const assert = require('assert')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../../http/models/user')

assert(process.env.FACEBOOK_APP_ID)
assert(process.env.FACEBOOK_APP_SECRET)
assert(process.env.APP_URL)

module.exports = () => {
  return new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.APP_URL}/auth/facebook/callback`
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOrCreate({ facebook_id: profile.id }, {
        facebook_id: profile.id,
        name: profile.displayName,
        provider: 'facebook'
      })
      user = user.toJSON()
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
}
