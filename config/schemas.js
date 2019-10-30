const Joi = require('@hapi/joi')

module.exports = {

  signin: Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(6).required().label('Пароль'),
  }),

  signup: Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(6).required().label('Пароль'),
    name: Joi.string().required().label('Имя'),
    subscribed: Joi.string().valid('on', 'off').default('off')
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
  }),

  updateUser: Joi.object({
    name: Joi.string().empty(''),
    description: Joi.string().empty(''),
    email: Joi.string().email().empty('')
  }),

  updatePassword: Joi.object({
    password: Joi.string().label('Пароль').required(),
    new_password: Joi.string().min(6).label('Новый пароль').required(),
    new_password_repeat: Joi.ref('new_password')
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required()
  })

}
