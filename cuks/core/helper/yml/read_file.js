'use strict'

module.exports = function(cuk) {
  const { fs } = cuk.lib
  const read = require('./read')(cuk)

  return (file, opts = {}, safe = true) => {
    if (!fs.existsSync(file)) return null
    let text = fs.readFileSync(file, 'utf8')
    return read(text, safe, opts)
  }
}