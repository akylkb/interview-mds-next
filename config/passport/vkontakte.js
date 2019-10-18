const assert = require('assert')
const VkontakteStrategy = require('passport-vkontakte').Strategy
const User = require('../../http/models/user')

assert(process.env.VKONTAKTE_APP_ID)
assert(process.env.VKONTAKTE_APP_SECRET)
assert(process.env.APP_URL)

module.exports = () => {
  return new VkontakteStrategy({
    clientID: process.env.VKONTAKTE_APP_ID,
    clientSecret: process.env.VKONTAKTE_APP_SECRET,
    callbackURL: `${process.env.APP_URL}/auth/vk/callback`
  }, async (accessToken, refreshToken, params, profile, done) => {
    try {
      let user = await User.findOrCreate({ vk_id: profile.id }, {
        vk_id: profile.id,
        name: profile.displayName,
        avatar: profile.photos.length > 0 ? profile.photos[0].value : '',
        provider: 'vk'
      })
      user = user.toJSON()
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
}
