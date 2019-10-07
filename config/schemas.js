const Joi = require('@hapi/joi')

module.exports = {
    signup: Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(6).required().label('Пароль')
    }),
    signin: Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(6).required().label('Пароль')
    }),
}