'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.lib
  const yaml = cuk.pkg.util.lib.yaml

  return (obj, opts, safe = true) => {
    const defOpts = cuk.pkg.util.cfg.common.yml.parserOpts
    opts = helper('core:merge')(defOpts, opts)
    return safe ? yaml.safeDump(obj, opts) : yaml.dump(obj, opts)
  }
}
