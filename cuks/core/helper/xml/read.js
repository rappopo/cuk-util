'use strict'

module.exports = function(cuk) {
  const { _, helper } = cuk.lib
  const parser = cuk.pkg.util.lib.xml

  return (obj, opts, validate = false) => {
    const defOpts = cuk.pkg.util.cfg.common.xml.parserOpts
    opts = helper('core:merge')(defOpts, opts)
    if (!parser.validate(obj)) throw helper('core:makeError')('Invalid xml data')
    return parser.parse(obj)
  }
}