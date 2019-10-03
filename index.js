require('dotenv').config()
const User = require('./api/models/user')

const user = new User()
user.save()