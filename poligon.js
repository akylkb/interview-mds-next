const jwt = require('jsonwebtoken')

const results = jwt.sign({
  data: 'refactoring'
}, 'secret', { expiresIn: '1d' })

console.log(results)
