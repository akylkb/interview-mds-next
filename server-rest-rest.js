require('dotenv').config()
require('./config/bookshelf')

const Koa = require('koa')
const Router = require('koa-router')
const passport = require('koa-passport')

const port = parseInt(process.env.APP_PORT) || 3000
const router = new Router()
const server = new Koa()

require('./config/passport')(server, passport)
require('./config/routes')(server, router, passport)
require('./config/koa')(server, router, passport)

server.use(router.routes())
server.use(router.allowedMethods())
server.listen(port, () => {
  console.log('ready on', port)
})
