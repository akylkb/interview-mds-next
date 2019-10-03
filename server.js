require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const apiRoutes = require('./routes/api')
const nextRoutes = require('./routes/next')

const port = parseInt(process.env.APP_PORT) || 3000
const dev = process.env.NODE_ENV === 'development'
const nextApp = next({ dev })

const router = new Router()

apiRoutes(router)
nextRoutes(router, nextApp)

nextApp.prepare().then(() => {
    const server = new Koa()
    
    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    server.use(router.routes())
    server.listen(port, () => {
        console.log('ready on', port)        
    })
})