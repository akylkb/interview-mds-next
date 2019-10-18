const UserController = require('../http/controllers/userController')
const QuestionController = require('../http/controllers/questionController')
const CommentController = require('../http/controllers/commentController')
const validator = require('./middlewares/validator')
const { loginRequired, adminRequired } = require('./middlewares/auth')
const schemas = require('./schemas')

module.exports = (server, router, passport) => {
  router.post('/signup', validator(schemas.sign), UserController.signup)
  router.post('/signin', validator(schemas.sign), UserController.signin)
  router.get('/logout', UserController.logout)

  const authCallback = (strategyName) => {
    return passport.authenticate(strategyName, {
      failureRedirect: '/auth-failure',
      successRedirect: '/'
    })
  }
  router.get('/auth/facebook', passport.authenticate('facebook'))
  router.get('/auth/facebook/callback', authCallback('facebook'))
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))
  router.get('/auth/google/callback', authCallback('google'))
  router.get('/auth/yandex', passport.authenticate('yandex'))
  router.get('/auth/yandex/callback', authCallback('yandex'))
  router.get('/auth/vk', passport.authenticate('vkontakte'))
  router.get('/auth/vk/callback', authCallback('vkontakte'))

  router.get('/test', passport.authenticate('jwt', { session: false }), ctx => {
    ctx.cookies.set('token', 'lasjdflkjasdfj')
    console.log('state:', ctx.state)
    console.log('keys:', ctx.keys)
    ctx.body = 'test'
  })

  // admin
  router.all('/admin*', adminRequired)

  // next
  router.get('/api/questions', QuestionController.findAll)
  router.get('/api/questions/:id', QuestionController.findById)
  router.post('/api/questions',
    loginRequired,
    validator(schemas.question),
    QuestionController.create
  )
  router.put('/api/questions/:id',
    loginRequired,
    validator(schemas.question),
    QuestionController.update
  )
  router.delete('/api/questions/:id',
    loginRequired,
    QuestionController.delete
  )
  router.get('/api/questions/:questionId/comments', QuestionController.findComments)

  router.get('/api/like/question/:id', loginRequired, async ctx => {
    const QuestionLike = globalThis.bookshelf.model('QuestionLike')
    const { id } = ctx.params
    const { user } = ctx.state
    ctx.status = await QuestionLike.createOrDelete(user.id, id)
  })

  router.get('/api/like/comment/:id', loginRequired, async ctx => {
    const QuestionCommentLike = globalThis.bookshelf.model('QuestionCommentLike')
    const { id } = ctx.params
    const { user } = ctx.state
    ctx.status = await QuestionCommentLike.createOrDelete(user.id, id)
  })

  router.post('/api/comment/question/:id',
    loginRequired,
    validator(schemas.comment),
    CommentController.createForQuestion
  )
}
