module.exports = bookshelf => {
    const QuestionComment = bookshelf.model('QuestionComment', {
        tableName: 'question_comments',
        hasTimestamp: true,

        question() {
            this.belongsTo('Question')
        }
    })

    return QuestionComment
}