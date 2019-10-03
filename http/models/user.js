const _ = require('lodash')
const assert = require('assert')

module.exports = bookshelf => {
    const User = bookshelf.model('User', {
        tableName: 'users',
        hasTimestamps: true,
        hidden: ['password_hash', 'auth_token'],

        questions() {
            return this.hasMany('Question')
        },
    })

    User.findAll = async () => {
        return await User.fetchAll()
    }

    User.findOne = async (id) => {
        return await User.where({ id }).fetch()
    }

    User.create = async (data) => {
        assert(_.isObject(data))

        try {
            const user = new User(data)
            return await user.save()
        } catch {
            return null
        }
        
    }

    User.update = async (id, data) => {
        assert(_.isObject(data))

        try {
            const user = await User.where({ id }).fetch()
            return await user.save(data)
        } catch {
            return null
        }
    }

    
    return User
}

