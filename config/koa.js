const bodyParser = require('koa-bodyparser')
const jsonResponse = require('./middlewares/json-response')

module.exports = (server, router) => {
    //server.use(boom())
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

    server.use(jsonResponse())
    server.use(bodyParser())
    server.use(router.routes())
    server.use(router.allowedMethods())
}