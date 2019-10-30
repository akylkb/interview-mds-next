const assert = require('assert')

class User extends global.bookshelf.Model {
  get tableName () {
    return 'users'
  }

  get hidden () {
    return ['password_hash', 'token', 'created_at', 'updated_at']
  }

  questions () {
    return this.hasMany('Question')
  }

  static async findAll (filter = {}, options = {}) {
    options = {
      ...options,
      withRelated: [
        { questions: query => query.where('active', 1) }
      ]
    }
    const result = await super.findAll(filter, options)
    return result
  }

  static async getCounts (userId) {
    try {
      const QuestionComment = global.bookshelf.model('QuestionComment')
      const Question = global.bookshelf.model('Question')

      const [questions, answers, correct] = await Promise.all([
        Question.forge().where({ user_id: userId }).count(),
        QuestionComment.forge().where({ user_id: userId }).count(),
        QuestionComment.forge().where({ user_id: userId, marked: true }).count()
      ])
      return {
        questions,
        answers,
        correct
      }
    } catch (err) {
      console.error(err)
      return {
        questions: 0,
        answers: 0,
        correct: 0
      }
    }
  }

  static async createOrFail (data) {
    assert(data.email)

    const promise = new Promise((resolve, reject) => {
      const { email } = data
      this.findOne({ email })
        .then(() => reject(new Error('Такой пользователь существует')))
        .catch(() => resolve())
    })
    await promise
    const result = await this.create(data)
    return result
  }

  static async findOrCreate (filter, data) {
    assert(filter)
    assert(data)

    const promise = new Promise((resolve, reject) => {
      this.findOne(filter)
        .then(user => resolve(user))
        .catch(() => resolve(null))
    })

    const user = await promise
    if (user) {
      return user
    }

    const newUser = await this.create(data)
    return newUser
  }
}

module.exports = global.bookshelf.model('User', User)
