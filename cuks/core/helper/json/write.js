'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib

  return (obj, opts) => {
    return JSON.stringify(obj)
  }
}
