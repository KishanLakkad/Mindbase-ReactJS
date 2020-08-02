if (process.env.NODE_ENV === 'production') {
  module.exports = require('./src/index.js')
} else {
  module.exports = require('./src/index.js')
}
