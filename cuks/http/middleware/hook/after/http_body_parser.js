'use strict'

module.exports = function(cuk) {

  const { _, helper } = cuk.lib
  const koaBody = cuk.pkg.http.lib.koaBody

  return () => {
    let mw = cuk.pkg.http.cuks.http.middleware.bodyParser
    mw = (options) => {
      return koaBody(helper('core:makeOptions')('http', 'common.middlewareOptions.bodyParser', options))
    }
    return 'Monkey patch http:bodyParser'
  }

}