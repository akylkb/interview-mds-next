require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const apiRoutes = require('./routes/api')

const port = parseInt(process.env.APP_PORT) || 3000
const router = new Router()
const server = new Koa()

apiRoutes(router)

server.use(bodyParser())
server.use(router.routes())
server.use(router.allowedMethods())
server.listen(port, () => {
    console.log('ready on', port)        
})
