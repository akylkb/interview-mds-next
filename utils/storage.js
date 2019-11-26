const getGuest = () => {
  const storage = window.localStorage.getItem('guest')
  if (storage === null) {
    return {}
  }
  return JSON.parse(storage)
}

const setGuest = (data) => {
  const oldData = getGuest()
  const newData = {
    ...oldData,
    ...data
  }
  return window.localStorage.setItem('guest', JSON.stringify(newData))
}

export {
  getGuest,
  setGuest
}
