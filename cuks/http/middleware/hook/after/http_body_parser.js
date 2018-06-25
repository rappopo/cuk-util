'use strict'

module.exports = function(cuk) {

  const { _, helper } = cuk.lib
  const { text: parseText } = cuk.pkg.util.lib.coBody
//  const koaBody = cuk.pkg.http.lib.koaBody


  return () => {
    let oFn = helper('http:middleware')('http:bodyParser')
    cuk.pkg.http.cuks.http.middleware.bodyParser = (options) => {
      return async function (ctx, next) {
        if (ctx.is('*/xml', '+xml')) {
          const text = await parseText(ctx)
          const data = helper('util:xmlRead')(text)
          ctx.req.body = data
          ctx.request.body = data
          return next()
        }
        await oFn(options)(ctx, next)
      }
    }
    return 'Monkey patch http:bodyParser'
  }

}