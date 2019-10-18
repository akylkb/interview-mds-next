const serializeForm = (element) => {
  const formData = new FormData(element)
  const jsonObject = {}

  for (const [key, value] of formData.entries()) {
    jsonObject[key] = value
  }
  return jsonObject
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const currentDate = new Date()
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Окрябрь', 'Ноябрь', 'Декабрь']
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()
  const time = `${date.getHours()}:${date.getMinutes()}`

  if (currentDate.getDate() === day) {
    return `Сегодня в ${time}`
  } else if (currentDate.getDate() - 1 === day) {
    return `Вчера в ${time}`
  }
  return `${months[monthIndex]} ${day}, ${year} в ${time}`
}

module.exports = {
  serializeForm,
  formatDate
}
