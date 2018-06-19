'use strict'

module.exports = function(cuk) {
  const yaml = cuk.pkg.util.lib.yaml

  return (text, safe = true, opts = {}) => {
    return safe ? yaml.safeLoad(text, opts) : yaml.load(text, opts)
  }
}