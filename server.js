require('dotenv').config()
require('./config/bookshelf')

const Koa = require('koa')
const Router = require('koa-router')
const passport = require('koa-passport')
const next = require('next')

const port = parseInt(process.env.APP_PORT) || 3000
const dev = process.env.NODE_ENV === 'development'
const nextApp = next({ dev })
const router = new Router()
const server = new Koa()

require('./config/passport')(passport)
require('./config/routes/api')(router, passport)
require('./config/routes/next')(nextApp, router, passport)
require('./config/koa')(server, router, passport)


nextApp.prepare().then(() => {
    server.use(passport.initialize())
    server.listen(port, () => {
        console.log('ready on', port)        
    })
})
