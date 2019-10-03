const options = require('../../knexfile')
const knex = require('knex')(options)
const bookshelf = require('bookshelf')(knex)

const modelUser = require('./user')
const modelQuestion = require('./question')
const modelQuestionComment = require('./question_comment')

module.exports = {
    User: modelUser(bookshelf),
    Question: modelQuestion(bookshelf),
    QuestionComment: modelQuestionComment(bookshelf),
}