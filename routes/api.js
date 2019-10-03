const User = require('../http/controllers/userController')
const Question = require('../http/controllers/questionController')

module.exports = (router) => {
    const base = process.env.API_BASE

    router.get(`${base}/users`, User.findAll)
    router.get(`${base}/users/:id`, User.findOne)
    router.post(`${base}/users`, User.create)
    router.put(`${base}/users/:id`, User.update)

    router.get(`${base}/questions`, Question.findAll)
    router.get(`${base}/questions/:id`, Question.findOne)
    router.post(`${base}/questions`, Question.create)
    router.put(`${base}/questions/:id`, Question.update)
    router.delete(`${base}/questions/:id`, Question.delete)
    
}