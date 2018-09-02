'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib
  const parser = cuk.pkg.util.lib.xml

  return (text, opts, validate = false) => {
    const defOpts = cuk.pkg.util.cfg.common.xml.parserOpts
    opts = helper('core:merge')(defOpts, opts)
    if (!parser.validate(text)) throw helper('core:makeError')('Invalid xml data')
    return parser.parse(text)
  }
}