const assert = require('assert')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../../http/models/user')

assert(process.env.GOOGLE_APP_ID)
assert(process.env.GOOGLE_APP_SECRET)
assert(process.env.APP_URL)

module.exports = () => {
    return new GoogleStrategy({
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: `${process.env.APP_URL}/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOrCreate({ google_id: profile.id }, {
                google_id: profile.id,
                name: profile.displayName,
                avatar: profile.photos.length > 0 ? profile.photos[0].value : '',
                provider: 'google'
            })
            user = user.toJSON()
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    })
}