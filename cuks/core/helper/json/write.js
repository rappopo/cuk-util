'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.lib
  return (obj, opts, safe = true) => {
    return JSON.stringify(obj)
  }
}
