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
      answers = answers / 5
      const total = questions + answers + correct
      const rating = Math.floor((total / 60) * 100)

      await user.save({
        rating: rating > 100 ? 100 : rating
      })
    })
    ctx.body = 'ok'
  }
}
