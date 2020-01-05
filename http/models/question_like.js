class QuestionLike extends global.bookshelf.Model {
  get tableName () {
    return 'question_likes'
  }

  get hasTimestamps () {
    return false
  }

  question () {
    this.belongsTo('Question')
  }

  static async createOrDelete (userId, questionId, guestHash) {
    let query = { user_id: userId, question_id: questionId }
    if (guestHash) {
      query = { question_id: questionId, guest_hash: guestHash }
    }
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

module.exports = global.bookshelf.model('QuestionLike', QuestionLike)
