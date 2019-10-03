const { Question } = require('../models')

class QuestionController {
    static async findAll(ctx) {
        ctx.body = await Question.findAll()
    }

    static async findOne(ctx) {
        const { id } = ctx.params
        ctx.body = await Question.findOne(id)
    }

    static async create(ctx) {
        const data = ctx.request.body
        ctx.body = await Question.create(data)
    }

    static async update(ctx) {
        ctx.body = 'update'
    }

    static async delete(ctx) {
        ctx.body = 'delete'
    }

}

module.exports = QuestionController