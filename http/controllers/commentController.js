class CommentController {
  static async createForQuestion (ctx) {
    const QuestionComment = globalThis.bookshelf.model('QuestionComment')
    const { id } = ctx.params
    const { user } = ctx.state
    const { body } = ctx.request

    const result = await QuestionComment.create({
      ...body,
      user_id: user.id,
      question_id: id
    })

    ctx.success = result.toJSON()
  }
}

module.exports = CommentController
