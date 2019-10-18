const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const jsonResponse = require('./middlewares/json-response')

module.exports = (server, router) => {
  // server.use(boom())
  server.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = {
        success: false,
        message: err.message
      }
      console.error(err)
    }
  })
  server.keys = ['a866bcc12f7bc9e7eeabe768368079c6']
  server.use(session({}, server))
  server.use(jsonResponse())
  server.use(bodyParser())
}
