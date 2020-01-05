const _ = require('lodash')
const assert = require('assert')
const bcrypt = require('bcrypt')
const md5 = require('md5')

const clearData = (obj, allowedKeys = []) => {
  assert(_.isObject(obj))
  assert(_.isArray(allowedKeys))

  const newObj = {}
  for (const key in obj) {
    if (!allowedKeys.includes(key)) {
      continue
    }
    newObj[key] = obj[key]
  }
  return newObj
}

const asyncGenerateHash = async text => {
  const saltRounds = 10
  const result = await bcrypt.hash(text, saltRounds)
  return result
}

const asyncCheckHash = async (text, hash) => {
  const result = await bcrypt.compare(text, hash)
  return result
}

const getGuestHash = (userAgent = null) => {
  if (userAgent) {
    return md5(userAgent)
  }
  return null
}

module.exports = {
  clearData,
  asyncGenerateHash,
  asyncCheckHash,
  getGuestHash
}
