class QuestionComment extends globalThis.bookshelf.Model {
    get tableName() {
        return 'question_comments'
    }

    question() {
        this.belongsTo('Question')
    }
}

module.exports = globalThis.bookshelf.model('QuestionComment', QuestionComment)