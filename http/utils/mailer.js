const assert = require('assert')
const nodemailer = require('nodemailer')

assert(process.env.APP_URL)
assert(process.env.MAIL_HOST)
assert(process.env.MAIL_PORT)
assert(process.env.MAIL_USER)
assert(process.env.MAIL_PASS)
assert(process.env.MAIL_FROM)

class Mailer {
  static createTranport () {
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })
  }

  static async send (to, subject, html) {
    const transporter = this.createTranport()
    const result = await transporter.sendMail({
      from: process.env.MAIL_FROM, // sender address
      to,
      subject,
      html
      // text: 'Hello world?',
    })
    return result
  }

  static async sendResetPassword (to, token) {
    const subject = 'Восстановление пароля'
    const html = `
      С вашей учетной записи был сделан запрос на восстановление пароля.
      <a href="${process.env.APP_URL}/change-password?token=${token}">Сменить пароль</a>.
    `
    return this.send(to, subject, html)
  }
}

module.exports = Mailer
