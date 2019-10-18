const assert = require('assert')

class User extends global.bookshelf.Model {
  get tableName () {
    return 'users'
  }

  get hidden () {
    return ['password_hash', 'created_at', 'updated_at']
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
    return await super.findAll(filter, options)
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

    return await this.create(data)
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
    return await newUser
  }
}

module.exports = global.bookshelf.model('User', User)
