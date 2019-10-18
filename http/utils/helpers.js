const _ = require('lodash')
const assert = require('assert')
const bcrypt = require('bcrypt')

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
  return await bcrypt.hash(text, saltRounds)
}

const asyncCheckHash = async (text, hash) => {
  return await bcrypt.compare(text, hash)
}

module.exports = {
  clearData,
  asyncGenerateHash,
  asyncCheckHash
}
