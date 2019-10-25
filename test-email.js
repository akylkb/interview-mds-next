require('dotenv').config()
const Mailer = require('./http/utils/mailer')

const mailer = Mailer.sendResetPassword('akyl.kb@gmail.com', 'bfb5e7d6928e0f7e608d57f4538e3444')
mailer.catch(console.log)
