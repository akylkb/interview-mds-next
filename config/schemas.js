const Joi = require('@hapi/joi')

module.exports = {

  // signup, signin
  sign: Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(6).required().label('Пароль')
  }),

  // create, update
  question: Joi.object({
    title: Joi.string().required().label('Заголовок'),
    description: Joi.string().empty('').label('Описание'),
    answer: Joi.string().empty('').label('Ответ'),
    level: Joi.string().label('Сложность').valid('junior', 'middle', 'senior').default('junior')
  }),

  comment: Joi.object({
    content: Joi.string().required()
  })

}
