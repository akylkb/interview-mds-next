const User = globalThis.bookshelf.model('User')
const facebookStrategy = require('./facebook')
const googleStrategy = require('./google')
const yandexStrategy = require('./yandex')
const vkontakteStrategy = require('./vkontakte')

module.exports = function(server, passport) {

  passport.serializeUser(function(user, done) {
    //console.log('serizlize user', user)
    // TODO: JWT auth, ошибки учесть
    // в токен данные: id, group, name
    if (user) {
      return done(null, user.id)
    }
    return done(new Error('Нет данных'))
  })
  
  passport.deserializeUser(async function(id, done) {
    console.log('deserialize user', id)
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch(err) {
      done(err)
    }
  })
  
  passport.use(facebookStrategy())
  passport.use(googleStrategy())
  passport.use(yandexStrategy())
  passport.use(vkontakteStrategy())

  server.use(passport.initialize())  
}