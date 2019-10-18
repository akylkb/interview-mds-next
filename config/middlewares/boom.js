const Boom = require('@hapi/boom')

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      const boom = Boom.boomify(err, { statusCode: err.status }).output

      ctx.status = boom.statusCode
      ctx.headers = {
        ...ctx.headers,
        ...boom.headers
      }
      ctx.body = boom.payload
    }
  }
}
