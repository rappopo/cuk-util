'use strict'

module.exports = function(cuk) {
  const { helper, _, path, fs } = cuk.lib

  const patchCoreLoadConfig = () => {
    let oFn = cuk.pkg.core.cuks.core.helper.loadConfig
    let fn = (dir, file) => {
      return new Promise((resv, rejc) => {
        oFn(dir, file)
        .then(result => {
          if (!_.isEmpty(result)) return Promise.resolve(result)
          let nResult = {},
            f = path.join(dir, `${file}.yml`)
          if (fs.existsSync(f))
            try {
              nResult = helper('util:ymlReadFile')(f)
            } catch(e) { throw e }
          return Promise.resolve(nResult)
        })
        .then(result => {
          if (!_.isEmpty(result)) return Promise.resolve(result)
          let nResult = {},
            f = path.join(dir, `${file}.xml`)
          if (fs.existsSync(f))
            try {
              nResult = helper('util:xmlReadFile')(f)
            } catch(e) {}
          return Promise.resolve(nResult)
        })
        .then(resv)
        .catch(rejc)
      })
    }
    cuk.pkg.core.cuks.core.helper.loadConfig = fn
  }

  const patchRestWrite = () => {
    let fn = (obj, ctx) => {
      const pkg = cuk.pkg.util
      if (ctx.params && ctx.params.ext) {
        ctx.type = pkg.cfg.common[ctx.params.ext].contentType || 'application/json; charset=utf-8'
        ctx.body = helper(`util:${ctx.params.ext}Write`)(obj)
      }
    }
    cuk.pkg.rest.cuks.core.helper.write = fn
  }

  return () => {
    patchCoreLoadConfig()
    if (cuk.pkg.rest)
      patchRestWrite()
    return 'Patching core:loadConfig & rest:write'

  }
}