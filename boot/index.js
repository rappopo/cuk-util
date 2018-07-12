'use strict'

module.exports = function(cuk){
  let pkgId = 'util',
    pkg = cuk.pkg[pkgId]
  const { _, helper, path, fs, globby } = cuk.pkg.core.lib

  return new Promise((resolve, reject) => {
    resolve(true)
  })
}