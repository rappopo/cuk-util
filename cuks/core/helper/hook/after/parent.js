'use strict'

module.exports = function(cuk) {
  const { helper, _, path, fs } = cuk.pkg.core.lib

  const patchConfig = () => {
    let oFn = cuk.pkg.core.cuks.core.helper.configLoad
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
    cuk.pkg.core.cuks.core.helper.configLoad = fn
    let oExt = cuk.pkg.core.cuks.core.helper.configFileExt()
    cuk.pkg.core.cuks.core.helper.configFileExt = () => {
      return _.concat(oExt, ['.yml', '.xml'])
    }
  }

  const patchRestWrite = () => {
    let fn = (obj, ctx) => {
      const pkg = cuk.pkg.util
      let valid = !!_.get(ctx, 'params.ext')
      if (!_.get(ctx, 'params.ext')) {
        const ext = path.extname(ctx.path).substr(1)
        if (cuk.pkg.rest.cfg.common.supportedFormats.indexOf(ext) > -1) {
          valid = true
          _.set(ctx, 'params.ext', ext)
        }
      }
      if (valid) {
        ctx.type = pkg.cfg.common[ctx.params.ext].contentType || 'application/json; charset=utf-8'
        ctx.body = helper(`util:${ctx.params.ext}Write`)(obj)
      } else {
        ctx.type = 'text/html'
        ctx.body = JSON.stringify(obj)
      }
    }
    cuk.pkg.rest.cuks.core.helper.write = fn
  }

  return () => {
    patchConfig()
    if (cuk.pkg.rest)
      patchRestWrite()
    return 'Patching core:configLoad, core:configFileExt & rest:write'

  }
}