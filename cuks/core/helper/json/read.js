'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib

  return (text, opts) => {
    return JSON.parse(text)
  }
}
