const Question = global.bookshelf.model('Question')
const QuestionComment = global.bookshelf.model('QuestionComment')

class AdminController {
  static async getQuestions (ctx) {
    const { page } = ctx.request.query
    const results = await Question.findAll({}, {
      pageSize: 20,
      page,
      columns: '*'
    })
    ctx.success = results
  }

  static async updateQuestion (ctx) {
    const { id } = ctx.params
    const { body } = ctx.request
    try {
      const result = await Question.update(body, { id })
      ctx.success = result.toJSON()
    } catch (err) {
      ctx.failure = err.message
      console.error(err)
    }
  }

  static async deleteQuestion (ctx) {
    const { id } = ctx.params
    try {
      await Question.destroy({ id })
      ctx.status = 202
      ctx.success = 'Deleted'
    } catch (err) {
      ctx.status = 400
      ctx.failure = err.message
      console.error(err)
    }
  }

  static async updateComment (ctx) {
    const { id } = ctx.params
    const { body } = ctx.request
    try {
      const result = await QuestionComment.update(body, { id })
      ctx.success = result.toJSON()
    } catch (err) {
      ctx.failure = err.message
      console.error(err)
    }
  }

  static async deleteComment (ctx) {
    const { id } = ctx.params
    try {
      await QuestionComment.destroy({ id })
      ctx.status = 202
      ctx.success = 'Deleted'
    } catch (err) {
      ctx.status = 400
      ctx.failure = err.message
      console.error(err)
    }
  }
}

module.exports = AdminController
