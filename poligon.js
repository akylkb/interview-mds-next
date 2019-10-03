const { User } = require('./http/models')




;(async () => {
    const user = await User.where({id: 1}).fetch({ withRelated: ['questions']})
    console.log(user.related('questions').toJSON())
    
})()
