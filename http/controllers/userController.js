const {User} = require('../models')

class UserController {
    
    static async findAll(ctx) {
        const users = await User.findAll()
        ctx.body = users
    }

    static async findOne(ctx) {
        const { id } = ctx.params
        const user = await User.findOne(id)
        ctx.body = user
    }

    static async update(ctx) {
        const { id } = ctx.params
        const data = ctx.request.body
        const userUpdated = await User.update(id, data)
        ctx.body = userUpdated
    }

    static async updatePassword(ctx) {
        ctx.body = 'update password'
    }

    static async create(ctx) {
        const data = ctx.request.body
        const user = await User.create(data)
        ctx.body = user
    }

    static async delete(ctx) {
        ctx.body = 'delete'
    }

}

module.exports = UserController