const _ = require('lodash')
const assert = require('assert')

const removeKeysFromObject = (obj, allowedKeys = []) => {
    assert(_.isObject(obj))    
    assert(_.isArray(allowedKeys))

    const newObj = {}
    for (let key in obj) {
        if (!allowedKeys.includes(key)) {
            continue
        }
        newObj[key] = obj[key]
    }
    return newObj
}

module.exports = {
    removeKeysFromObject,
}