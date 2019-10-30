module.exports = class CronController {
  static async updateRating (ctx) {
    const User = global.bookshelf.model('User')
    const users = await User.fetchAll({ columns: ['id', 'rating'] })
    users.forEach(async user => {
      let {
        questions,
        answers,
        correct
      } = await User.getCounts(user.id)
      questions = questions > 100 ? 100 : questions
      answers = answers > 100 ? 100 : answers
      correct = correct > 100 ? 100 : correct
      const total = questions + answers + correct
      const rating = Math.floor(total / 3)

      await user.save({
        rating
      })
    })
    ctx.body = 'ok'
  }
}
