'use strict'

module.exports = function (cuk) {
  const { helper } = cuk.pkg.core.lib
  const { text: parseText } = cuk.pkg.util.lib.coBody

  return () => {
    let oFn = helper('http:middleware')('http:bodyParser')
    cuk.pkg.http.cuks.http.middleware.bodyParser = (options) => {
      return async function (ctx, next) {
        const format = {
          xml: ctx.is('*/xml', '+xml'),
          yml: ctx.is('*/yaml', '*/yml', 'text/plain')
        }
        if (format.xml || format.yml) {
          const text = await parseText(ctx)
          let data
          if (format.xml) data = helper('util:xmlRead')(text)
          else if (format.yml) data = helper('util:ymlRead')(text)
          if (!data) return next()
          ctx.req.body = data
          ctx.request.body = data
          return next()
        }
        await oFn(options)(ctx, next)
      }
    }
    return 'Patching http:bodyParser'
  }
}
