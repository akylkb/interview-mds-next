const UserController = require('../http/controllers/userController')
const validator = require('./middlewares/validator')
const schemas = require('./schemas')

module.exports = (server, router, passport) => {

    router.post('/signup', validator(schemas.signup), UserController.signup)
    router.post('/signin', validator(schemas.signin), UserController.signin)
    
    const authMiddleware = (strategyName) => {
        return passport.authenticate(strategyName, {
            failureRedirect: '/auth-failure',
            successRedirect: '/auth-success'
        })
    }
    router.get('/auth/facebook', passport.authenticate('facebook'))
    router.get('/auth/facebook/callback', authMiddleware('facebook'))
    router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))
    router.get('/auth/google/callback', authMiddleware('google'))
    router.get('/auth/yandex', passport.authenticate('yandex'))
    router.get('/auth/yandex/callback', authMiddleware('yandex'))
    router.get('/auth/vk', passport.authenticate('vkontakte'))
    router.get('/auth/vk/callback', authMiddleware('vkontakte'))

}