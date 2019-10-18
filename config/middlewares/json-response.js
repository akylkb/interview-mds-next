const body = (success, data) => {
  if (typeof data === 'object') {
    return {
      success,
      data
    }
  }
  return {
    success,
    message: data
  }
}

module.exports = () => {
  return async (ctx, next) => {
    await next()
    if (ctx.success) {
      ctx.body = body(true, ctx.success)
    } else if (ctx.failure) {
      ctx.body = body(false, ctx.failure)
      ctx.status = ctx.status === 200 ? 400 : ctx.status
    }
  }
}
