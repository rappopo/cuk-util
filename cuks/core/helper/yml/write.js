'use strict'

module.exports = function (cuk) {
  const { helper } = cuk.pkg.core.lib
  const { yaml } = cuk.pkg.util.lib

  return (obj, opts, safe = true) => {
    const defOpts = cuk.pkg.util.cfg.yml.parserOpts
    opts = helper('core:merge')(defOpts, opts)
    return safe ? yaml.safeDump(obj, opts) : yaml.dump(obj, opts)
  }
}
