const passport = require('koa-passport')

exports.loginRequired = async (ctx, next) => {
  return passport.authenticate('jwt', async (err, user) => {
    if (err) {
      console.error(err)
      ctx.failure = 'Не удалось авторизоваться'
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

exports.guestOrUser = async (ctx, next) => {
  return passport.authenticate('jwt', async (err, user) => {
    if (err) {
      console.error(err)
    }
    if (user) {
      ctx.login(user)
    } else {
      // guest
      ctx.login({ id: 2, group: 'guest' })
    }
    await next()
  })(ctx)
}

exports.adminRequired = async (ctx, next) => {
  return passport.authenticate('jwt', async (err, user) => {
    if (err) {
      ctx.status = 500
      ctx.failure = 'Не удалось авторизоваться'
      console.log(err)
      return
    }
    if (user && user.get('group') === 'admin') {
      // ctx.login(user)
      await next()
      return
    }
    ctx.status = 403
    ctx.body = 'Сюда вам нельзя'
  })(ctx)
}
