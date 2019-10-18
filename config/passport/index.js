const User = global.bookshelf.model('User')
const facebookStrategy = require('./facebook')
const googleStrategy = require('./google')
const yandexStrategy = require('./yandex')
const vkontakteStrategy = require('./vkontakte')
const jwtStrategy = require('./jwt')

module.exports = function (server, passport) {
  passport.serializeUser(function (user, done) {
    console.log('serizlize user', user)
    // TODO: JWT auth, ошибки учесть
    // в токен данные: id, group, name
    if (user) {
      return done(null, user.id)
    }
    return done(new Error('Нет данных'))
  })

  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser', id)
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  passport.use(facebookStrategy())
  passport.use(googleStrategy())
  passport.use(yandexStrategy())
  passport.use(vkontakteStrategy())
  passport.use(jwtStrategy())

  server.use(passport.initialize())
  // TODO: сессия может сломать сервер если пользователя нет в базе, заменить на jwt
  // server.use(passport.session({}))
}
