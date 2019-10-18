const jwt = require('jsonwebtoken')

const results = jwt.sign({
  data: 'foo'
}, 'secret', { expiresIn: '1d' })

console.log(results)
