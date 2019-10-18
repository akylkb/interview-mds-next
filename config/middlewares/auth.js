exports.loginRequired = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next()
    return
  }
  ctx.status = 401
  ctx.failure = 'Вы не авторизованы'
  // ctx.redirect('/signin')
}

exports.adminRequired = async (ctx, next) => {
  try {
    if (ctx.isAuthenticated() && ctx.state.user.get('group') === 'admin') {
      await next()
      return
    }
  } catch (err) {
    ctx.status = 401
    ctx.failure = 'Вы не авторизованы'
  }
  ctx.status = 403
}
