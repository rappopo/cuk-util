'use strict'

module.exports = function (cuk) {
  const { fs, helper } = cuk.pkg.core.lib

  return (file, obj, opts = {}, declaration = true, overWrite = true) => {
    if (fs.existsSync(file) && !overWrite) throw helper('core:createError')('File already exists: ' + file)
    let result = helper('util:xmlWrite')(obj, opts, declaration)
    return fs.writeFileSync(file, result)
  }
}
