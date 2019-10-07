const assert = require('assert')

module.exports = bookshelf => {
    return class Model extends bookshelf.Model {
        get hasTimestamps() {
            return ['created_at', 'updated_at']
        }
        static async findAll(filter = {}, options = {}) {
            return await this.forge().where(filter).fetchAll(options)
        }

        static async findById(id, options = {}) {
            return await this.findOne({ [this.prototype.idAttribute]: id }, options)
        }

        static async findOne(query = {}, options) {
            return await this.forge(query).fetch({
                require: true,
                ...options
            })
        }

        static async create(data, options = {}) {
            return await this.forge(data).save(null, options)
        }

        static async update(data, {id, ...options}) {
            assert(data !== undefined)
            assert(id !== undefined)
            
            options = {require: true, patch: true, ...options}
            return await this.forge({ [this.prototype.idAttribute]: id })
                .fetch(options)
                .then(model => {
                    return model ? model.save(data, options) : null
                })
        }

        static async destroy({id, ...options}) {
            options = { require: true, ...options}
            return await this.forge({ [this.prototype.idAttribute]: id }).destroy(options)
        }


    }
}