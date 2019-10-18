const passport = require('koa-passport')

exports.loginRequired = async (ctx, next) => {
  return passport.authenticate('jwt', async (err, user) => {
    if (err) {
      ctx.failure = err.message
      console.error(err)
      return
    }
    if (user) {
      ctx.login(user)
      await next()
      return
    }
    ctx.status = 401
    ctx.failure = 'Вы не авторизованы'
  })(ctx)
}

exports.adminRequired = async (ctx, next) => {
  return passport.authenticate('jwt', async (err, user) => {
    if (err) {
      ctx.status = 500
      console.error(err)
      return
    }
    if (user && user.get('group') === 'admin') {
      await next()
      return
    }
    ctx.status = 403
  })(ctx)
}
