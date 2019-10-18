const assert = require('assert')
const YandexStrategy = require('passport-yandex').Strategy
const User = require('../../http/models/user')

assert(process.env.YANDEX_APP_ID)
assert(process.env.YANDEX_APP_SECRET)
assert(process.env.APP_URL)

module.exports = () => {
  return new YandexStrategy({
    clientID: process.env.YANDEX_APP_ID,
    clientSecret: process.env.YANDEX_APP_SECRET,
    callbackURL: `${process.env.APP_URL}/auth/yandex/callback`
  }, async (accessToken, refreshToken, params, profile, done) => {
    console.log(profile)
    try {
      let user = await User.findOrCreate({ yandex_id: profile.id }, {
        yandex_id: profile.id,
        name: profile.displayName,
        avatar: `https://avatars.yandex.net/get-yapic/${profile._json.default_avatar_id}/islands-75`,
        provider: 'yandex'
      })
      user = user.toJSON()
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
}
