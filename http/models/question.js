//const { removeKeysFromObject } = require('../utils/helpers')

class Question extends globalThis.bookshelf.Model {
    get tableName() {
        return 'questions'
    }

    get hidden() {
        return ['answer']
    }
    
    user() {
        return this.belongsTo('User')
    }

    comments() {
        return this.hasMany('QuestionComment')
    }
}

module.exports = globalThis.bookshelf.model('Question', Question)