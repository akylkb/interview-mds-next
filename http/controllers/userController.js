const User = global.bookshelf.model('User')
const QuestionComment = global.bookshelf.model('QuestionComment')
const Question = global.bookshelf.model('Question')
const { asyncGenerateHash, asyncCheckHash } = require('../utils/helpers')
const token = require('../utils/token')

class UserController {
  static async signup (ctx) {
    const { password, ...data } = ctx.request.body
    const password_hash = await asyncGenerateHash(password)
    try {
      let user = await User.createOrFail({ ...data, password_hash, provider: 'local' })
      user = user.toJSON()
      if (typeof ctx.login === 'function') {
        const encodedToken = token.encode({ id: user.id })
        ctx.cookies.set('token', encodedToken)
        ctx.login(user)
      }
      // ctx.success = user
      ctx.redirect('/')
      ctx.status = 201
    } catch (err) {
      ctx.failure = err.message
    }
  }

  static async signin (ctx) {
    try {
      const { email, password } = ctx.request.body
      let user = await User.findOne({ email })
      const passwordHash = user.get('password_hash')

      const valid = await asyncCheckHash(password, passwordHash)
      if (!valid) {
        ctx.failure = 'Неправильный пароль'
        return
      }

      user = user.toJSON()
      if (typeof ctx.login === 'function') {
        const encodedToken = token.encode({ id: user.id })
        ctx.cookies.set('token', encodedToken)
        ctx.login(user)
      }
      ctx.success = user
    } catch (err) {
      console.error(err)
      ctx.failure = 'Проверьте правильность email и пароля'
    }
  }

  static async logout (ctx) {
    ctx.logout()
    ctx.cookies.set('token', '')
    ctx.redirect('/')
  }

  static async findAll (ctx) {
    const users = await User.findAll()
    ctx.body = users
  }

  static async findById (ctx) {
    const { id } = ctx.params
    try {
      const user = await User.forge().where({ id }).fetch()
      ctx.success = user.toJSON()
    } catch (err) {
      ctx.status = 400
      ctx.failure = err.message
    }
  }

  static async findComments (ctx) {
    const { userId } = ctx.params
    try {
      const result = await QuestionComment.forge().where({ user_id: userId }).fetchAll({ withRelated: 'question' })
      console.log(result)
      ctx.success = result.toJSON()
    } catch (err) {
      ctx.status = 400
      ctx.failure = err.message
      console.error(err)
    }
  }

  static async update (ctx) {
    const { id } = ctx.params
    const data = ctx.request.body
    const userUpdated = await User.update(id, data)
    ctx.body = userUpdated
  }

  static async updatePassword (ctx) {
    ctx.body = 'update password'
  }

  static async create (ctx) {
    const data = ctx.request.body
    const user = await User.create(data)
    ctx.body = user
  }

  static async delete (ctx) {
    ctx.body = 'delete'
  }

  static async getInfo (ctx) {
    const { userId } = ctx.params
    try {
      const [questions, answers, correct] = await Promise.all([
        Question.forge().where({ user_id: userId }).count(),
        QuestionComment.forge().where({ user_id: userId }).count(),
        QuestionComment.forge().where({ user_id: userId, marked: true }).count()
      ])
      ctx.success = {
        counts: {
          questions,
          answers,
          correct
        }
      }
    } catch (err) {
      ctx.failure = err.message
      console.error(err)
    }
  }
}

module.exports = UserController
