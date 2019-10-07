const options = require('../../knexfile')
const knex = require('knex')(options)
const bookshelf = require('bookshelf')(knex)
const Model = require('./model')(bookshelf)

globalThis.bookshelf = bookshelf
globalThis.bookshelf.Model = Model

// Register models
require('../../http/models/user')
require('../../http/models/question')
require('../../http/models/question_comment')