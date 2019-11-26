const Question = global.bookshelf.model('Question')
const QuestionComment = global.bookshelf.model('QuestionComment')

class QuestionController {
  static async findAll (ctx) {
    const { page, user } = ctx.request.query
    const filters = {}
    if (user) {
      filters.user_id = parseInt(user) || 0
    }
    const results = await Question.findAll({ active: true, ...filters }, {
      pageSize: 20,
      page
    })
    ctx.success = results
  }

  static async findById (ctx) {
    const { id } = ctx.params
    const question = await Question.findById(id)
    ctx.success = question
  }

  static async create (ctx) {
    const data = ctx.request.body
    const user = ctx.state.user
    const active = user.get && user.get('group') === 'admin'
    const result = await Question.create({
      ...data,
      active,
      user_id: user.id
    })
    ctx.success = result.toJSON()
  }

  static async update (ctx) {
    const { id } = ctx.params
    const data = ctx.request.body
    const user = ctx.state.user
    const question = await Question.findById(id)
    if (parseInt(question.get('user_id')) === parseInt(user.id)) {
      const result = await Question.update(data, { id })
      ctx.success = result.toJSON()
      return
    }
    ctx.failure = 'Запрещено'
  }

  static async delete (ctx) {
    const { id } = ctx.params
    const user = ctx.state.user
    const question = await Question.findById(id)
    if (parseInt(question.get('user_id')) === parseInt(user.id)) {
      await Question.destroy({ id })
      ctx.success = 'ok'
      return
    }
    ctx.failure = 'Запрещено'
  }

  static async findComments (ctx) {
    const { questionId } = ctx.params
    const result = await QuestionComment.findAll({ question_id: questionId })
    ctx.success = result
  }
}

module.exports = QuestionController
