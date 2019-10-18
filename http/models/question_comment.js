class QuestionComment extends globalThis.bookshelf.Model {
  get tableName () {
    return 'question_comments'
  }

  get hidden () {
    return ['updated_at']
  }

  user () {
    return this.belongsTo('User')
  }

  static async findAll (filter = {}, options = {}) {
    const QuestionCommentLike = globalThis.bookshelf.model('QuestionCommentLike')

    const models = await this.forge().where(filter).orderBy('created_at', 'DESC').fetchAll({
      withRelated: ['user']
    })

    const promises = models.map(async model => {
      const json = model.toJSON()
      const modelId = model.get('id')
      const likes = await QuestionCommentLike.where({ question_comment_id: modelId }).count()

      return {
        ...json,
        likes_count: likes
      }
    })

    const items = await Promise.all(promises)

    return items
  }
}

module.exports = globalThis.bookshelf.model('QuestionComment', QuestionComment)
