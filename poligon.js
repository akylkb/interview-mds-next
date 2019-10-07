require('./http/bookshelf')
const User = require('./http/models/user')


User.findAll().then(user => console.log(user.toJSON()))