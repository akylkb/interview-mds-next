// const { removeKeysFromObject } = require('../utils/helpers')

class Question extends global.bookshelf.Model {
  get tableName () {
    return 'questions'
  }

  get hidden () {
    return ['answer']
  }

  user () {
    return this.belongsTo('User')
  }

  comments () {
    return this.hasMany('QuestionComment')
  }

  static async findAll (filter = {}, options = {}) {
    const QuestionComment = global.bookshelf.model('QuestionComment')
    const QuestionLike = global.bookshelf.model('QuestionLike')

    const { models, pagination } = await this.forge().orderBy('created_at', 'DESC').where(filter).fetchPage({
      columns: ['id', 'user_id', 'title', 'level', 'created_at'],
      withRelated: ['user'],
      ...options
    })

    const promises = models.map(async model => {
      const json = model.toJSON()
      const modelId = model.get('id')
      const likes = await QuestionLike.where({ question_id: modelId }).count()
      const comments = await QuestionComment.where({ question_id: modelId }).count()

      return {
        ...json,
        likes_count: likes,
        comments_count: comments
      }
    })

    const items = await Promise.all(promises)

    return {
      items,
      pagination
    }
  }

  static async findById (id) {
    const QuestionComment = global.bookshelf.model('QuestionComment')
    const QuestionLike = global.bookshelf.model('QuestionLike')

    const model = await super.findById(id, { withRelated: ['user'] })

    const json = model.toJSON()
    const modelId = model.get('id')
    const likes = await QuestionLike.where({ question_id: modelId }).count()
    const comments = await QuestionComment.where({ question_id: modelId }).count()

    return {
      ...json,
      likes_count: likes,
      comments_count: comments
    }
  }
}

module.exports = global.bookshelf.model('Question', Question)
