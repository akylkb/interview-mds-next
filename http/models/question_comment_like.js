class QuestionCommentLike extends globalThis.bookshelf.Model {
  get tableName () {
    return 'question_comment_likes'
  }

  get hasTimestamps () {
    return false
  }

  comment () {
    this.belongsTo('Comment')
  }

  user () {
    this.belongsTo('User')
  }

  static async createOrDelete (userId, commentId) {
    const query = { user_id: userId, question_comment_id: commentId }
    try {
      await this.forge().where(query).fetch()
      await this.forge().where(query).destroy()
      return 202
    } catch {
      await this.forge(query).save()
      return 201
    }
  }
}

module.exports = globalThis.bookshelf.model('QuestionCommentLike', QuestionCommentLike)
