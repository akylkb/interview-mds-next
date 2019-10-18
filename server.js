require('dotenv').config()
require('dotenv').config()
require('./config/bookshelf')

const Koa = require('koa')
const Router = require('koa-router')
const passport = require('koa-passport')
const next = require('next')

const port = parseInt(process.env.APP_PORT) || 3000
const dev = process.env.NODE_ENV === 'development'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const router = new Router()
const server = new Koa()

require('./config/passport')(server, passport)
require('./config/routes')(server, router, passport)
require('./config/koa')(server, router, passport)

nextApp.prepare().then(() => {
  router.all('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.use(router.routes())
  server.use(router.allowedMethods())
  server.listen(port, () => {
    console.log('ready on', port)
  })
})
