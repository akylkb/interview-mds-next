const assert = require('assert')

module.exports = bookshelf => {
  return class Model extends bookshelf.Model {
    get hasTimestamps () {
      return ['created_at', 'updated_at']
    }

    static async findAll (filter = {}, options = {}) {
      const result = await this.forge().where(filter).fetchAll(options)
      return result
    }

    static async findById (id, options = {}) {
      const result = await this.findOne({ [this.prototype.idAttribute]: id }, options)
      return result
    }

    static async findOne (query = {}, options) {
      const result = await this.forge(query).fetch({
        require: true,
        ...options
      })
      return result
    }

    static async create (data, options = {}) {
      const result = await this.forge(data).save(null, options)
      return result
    }

    static async update (data, { id, ...options }) {
      assert(data !== undefined)
      assert(id !== undefined)

      options = { require: true, patch: true, ...options }
      const result = await this.forge({ [this.prototype.idAttribute]: id })
        .fetch(options)
        .then(model => {
          return model ? model.save(data, options) : null
        })
      return result
    }

    static async destroy ({ id, ...options }) {
      options = { require: true, ...options }
      const result = await this.forge({ [this.prototype.idAttribute]: id }).destroy(options)
      return result
    }
  }
}
