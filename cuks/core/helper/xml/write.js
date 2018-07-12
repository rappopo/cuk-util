'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib
  const Parser = cuk.pkg.util.lib.xml.j2xParser

  return (obj, opts, declaration = true) => {
    const defOpts = cuk.pkg.util.cfg.common.xml.parserOpts
    opts = helper('core:merge')(defOpts, opts)
    const parser = new Parser(opts)
    let data = parser.parse(obj)
    if (declaration)
      data = '<?xml version="1.0" encoding="UTF-8"?>\n' + data
    return data
  }
}