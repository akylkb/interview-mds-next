module.exports = (router, app) => {
    const handle = app.getRequestHandler()
    
    router.get('/b', async ctx => {
        await app.render(ctx.req, ctx.res, '/b', ctx.query)
        ctx.respond = false
    })

    router.get('/users/:id', async ctx => {
        const { id } = ctx.params
        const username = Math.random()
        await app.render(ctx.req, ctx.res, `/users/${id}`, {username})
        ctx.respond = false
    })

    router.all('*', async ctx => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
}