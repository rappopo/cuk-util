'use strict'

module.exports = function (cuk) {
  const { fs, helper } = cuk.pkg.core.lib

  return (file, obj, opts = {}, overWrite = true) => {
    if (fs.existsSync(file) && !overWrite) throw helper('core:createError')('File already exists: ' + file)
    let result = helper('util:jsonWrite')(obj, opts)
    return fs.writeFileSync(file, result)
  }
}
