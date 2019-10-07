const assert = require('assert')
const Joi = require('@hapi/joi')

module.exports = (schema, property = 'body') => {
    assert(Joi.isSchema(schema))
    const customMessages = {
        'object.unknown': '"{{#label}}" не допускается',
        'any.required': 'Поле "{{#label}}" обязательно'
    }

    return async (ctx, next) => {
        const { error } = schema.messages(customMessages).validate(ctx.request[property])
        if (!error) {
            await next()
        } else {
            const { details } = error
            const message = details.map(i => i.message).join(',')
            console.log('Error validation', details)
            ctx.status = 422
            ctx.body = {
                success: false,
                message
            }
        }
    }
}