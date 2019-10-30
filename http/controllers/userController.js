const md5 = require('md5')
const Mailer = require('../utils/mailer')
const User = global.bookshelf.model('User')
const QuestionComment = global.bookshelf.model('QuestionComment')
// const Question = global.bookshelf.model('Question')
const { asyncGenerateHash, asyncCheckHash } = require('../utils/helpers')
const tokenUtil = require('../utils/token')

class UserController {
  static async signup (ctx) {
    const { password, ...data } = ctx.request.body
    const password_hash = await asyncGenerateHash(password)
    try {
      let user = await User.createOrFail({ ...data, password_hash, provider: 'local' })
      user = user.toJSON()
      if (typeof ctx.login === 'function') {
        const encodedToken = tokenUtil.encode({ id: user.id })
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
        const encodedToken = tokenUtil.encode({ id: user.id })
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
      const json = user.toJSON()
      ctx.success = json
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
    const { body } = ctx.request
    const { id } = ctx.state.user
    const userUpdated = await User.update(body, { id })
    ctx.success = userUpdated.toJSON()
  }

  static async updatePassword (ctx) {
    const { password, new_password: newPassword } = ctx.request.body
    const { user } = ctx.state

    if (!user.get('email')) {
      ctx.failure = 'У вас нет email адреса'
      return
    }
    const passwordHash = user.get('password_hash')

    const valid = await asyncCheckHash(password, passwordHash)
    if (!valid) {
      ctx.failure = 'Введите ваш старый пароль правильно'
      return
    }
    const newPasswordHash = await asyncGenerateHash(newPassword)
    await User.update({
      password_hash: newPasswordHash
    }, {
      id: user.id
    })
    ctx.success = 'Пароль обновлен'
  }

  static async forgotPassword (ctx) {
    try {
      const { email } = ctx.request.body
      const user = await User.findOne({ email })
      const token = md5(Date.now())
      await user.save({
        token
      })
      Mailer.sendResetPassword(email, token)
      ctx.success = 'Письмо с инструкцией отправлена на почту'
    } catch (err) {
      ctx.status = 404
      ctx.failure = 'Пользователь не найден'
      console.error(err)
    }
  }

  static async changePassword (ctx) {
    try {
      const { token } = ctx.query
      if (!token.length > 10) {
        throw new Error('Not token')
      }
      const user = await User.findOne({ token })
      const encodedToken = tokenUtil.encode({ id: user.id })
      ctx.cookies.set('token', encodedToken)
      ctx.login(user)
      ctx.redirect('/my/settings')
    } catch (err) {
      ctx.redirect('/')
      console.error(err)
    }
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
      const counts = await User.getCounts(userId)
      ctx.success = {
        counts
      }
    } catch (err) {
      ctx.failure = err.message
      console.error(err)
    }
  }
}

module.exports = UserController
