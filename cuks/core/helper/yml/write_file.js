'use strict'

module.exports = function(cuk) {
  const { fs, helper } = cuk.pkg.core.lib

  return (file, obj, opts = {}, safe = true, overWrite = true) => {
    if (fs.existsSync(file) && !overWrite) throw helper('core:createError')('File already exists: ' + file)
    let result = helper('util:ymlWrite')(obj, opts, safe)
    return fs.writeFileSync(file, result)
  }
}