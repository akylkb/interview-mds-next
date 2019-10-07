const body = (success, rawData) => {
    if (typeof rawData === 'object') {
        const { message = '', ...data} = rawData
        return {
            success,
            message,
            data
        }
    }
    return {
        success,
        message: rawData
    }
}

module.exports = () => {
    return async (ctx, next) => {
        await next()
        if (ctx.success) {
            ctx.body = body(true, ctx.success)
        } else if (ctx.failure) {
            ctx.body = body(false, ctx.failure)
            ctx.status = ctx.status === 200 ? 400 : ctx.status
        }
    }
}