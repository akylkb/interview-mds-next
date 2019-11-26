const koaBody = require('koa-body')
const path = require('path')
const UserController = require('../http/controllers/userController')
const QuestionController = require('../http/controllers/questionController')
const CommentController = require('../http/controllers/commentController')
const AdminController = require('../http/controllers/adminController')
const Croncontroller = require('../http/controllers/cronController')
const validator = require('./middlewares/validator')
const { loginRequired, adminRequired, guestOrUser } = require('./middlewares/auth')
const schemas = require('./schemas')
const token = require('../http/utils/token')

module.exports = (server, router, passport) => {
  router.post('/signup', validator(schemas.signup), UserController.signup)
  router.post('/signin', validator(schemas.signin), UserController.signin)
  router.get('/logout', UserController.logout)
  router.get('/api/users/:id', UserController.findById)
  router.get('/api/users/:userId/comments', UserController.findComments)
  router.get('/api/users/:userId/info', UserController.getInfo)
  router.patch('/api/users',
    loginRequired,
    validator(schemas.updateUser),
    UserController.update
  )
  router.patch('/api/users/update-password',
    loginRequired,
    validator(schemas.updatePassword),
    UserController.updatePassword
  )
  router.post('/api/users/forgot-password',
    validator(schemas.forgotPassword),
    UserController.forgotPassword
  )
  router.get('/change-password', UserController.changePassword)
  // nextjs
  router.all('/my*', loginRequired)

  const authCallback = (strategyName) => {
    return (ctx, next) => passport.authenticate(strategyName, (err, user) => {
      if (err) {
        ctx.status = 500
        ctx.body = err.message
        return console.error(err)
      }

      if (user) {
        const encodedToken = token.encode({ id: user.id })
        ctx.cookies.set('token', encodedToken)
        ctx.login(user)
        ctx.redirect('/')
        return
      }
      ctx.redirect('/auth-fail')
    })(ctx)
  }
  router.get('/auth/facebook', passport.authenticate('facebook'))
  router.get('/auth/facebook/callback', authCallback('facebook'))
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))
  router.get('/auth/google/callback', authCallback('google'))
  router.get('/auth/yandex', passport.authenticate('yandex'))
  router.get('/auth/yandex/callback', authCallback('yandex'))
  router.get('/auth/vk', passport.authenticate('vkontakte'))
  router.get('/auth/vk/callback', authCallback('vkontakte'))

  router.get('/test',
    loginRequired,
    ctx => {
      ctx.body = 'test'
    }
  )

  router.get('/api/profile/me', loginRequired, ctx => {
    ctx.body = ctx.state.user.toJSON()
  })
  // admin
  router.get('/api/admin/questions', adminRequired, AdminController.getQuestions)
  router.get('/api/admin/questions/:id', adminRequired, AdminController.getQuestionById)
  router.put('/api/admin/questions/:id', adminRequired, AdminController.updateQuestion)
  router.delete('/api/admin/questions/:id', adminRequired, AdminController.deleteQuestion)

  router.put('/api/admin/comments/:id', adminRequired, AdminController.updateComment)
  router.delete('/api/admin/comments/:id', adminRequired, AdminController.deleteComment)
  router.all('/admin*', adminRequired)

  router.get('/api/questions', QuestionController.findAll)
  router.get('/api/questions/:id', QuestionController.findById)
  router.post('/api/questions',
    guestOrUser,
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

  router.get('/api/like/question/:id', guestOrUser, async ctx => {
    const QuestionLike = global.bookshelf.model('QuestionLike')
    const { id } = ctx.params
    const { user } = ctx.state
    ctx.status = await QuestionLike.createOrDelete(user.id, id)
  })

  router.get('/api/like/comment/:id', loginRequired, async ctx => {
    const QuestionCommentLike = global.bookshelf.model('QuestionCommentLike')
    const { id } = ctx.params
    const { user } = ctx.state
    ctx.status = await QuestionCommentLike.createOrDelete(user.id, id)
  })

  router.post('/api/comment/question/:id',
    guestOrUser,
    validator(schemas.comment),
    CommentController.createForQuestion
  )

  router.get('/cron/update-rating', Croncontroller.updateRating)

  router.post('/api/upload-avatar',
    loginRequired,
    koaBody({
      multipart: true,
      formidable: {
        uploadDir: path.join(__dirname, '../../uploads')
      }
    }),
    UserController.uploadAvatar
  )
}
