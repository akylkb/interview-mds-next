const { removeKeysFromObject } = require('../utils/helpers')

module.exports = bookshelf => {
    const Question = bookshelf.model('Question', {
        tableName: 'questions',
        hidden: ['answer'],

        user() {
            return this.belongsTo('User')
        },
        comments() {
            return this.hasMany('QuestionComment')
        },
    })


    Question.findAll = async () => {
        return await Question.where('active', true).fetchAll({ withRelated: ['user']})
    }

    Question.findOne = async (id) => {
        const question = await Question.where({ id }).fetch({
            withRelated: [
                'user',
                { comments: query => query.limit(20) }
            ],
        })
        return question
    }

    Question.create = async (data) => {
        const allowedFields = ['user_id', 'title', 'description']
        const filteredData = removeKeysFromObject(data, allowedFields)
        return await new Question(filteredData).save()
    }

    return Question
}