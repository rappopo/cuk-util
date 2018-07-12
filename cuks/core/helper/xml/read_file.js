'use strict'

module.exports = function(cuk) {
  const { fs, helper } = cuk.pkg.core.lib

  return (file, opts = {}, validate = false) => {
    if (!fs.existsSync(file)) throw helper('core:createError')('File doesn\'t exists: ' + file)
    let text = fs.readFileSync(file, 'utf8')
    return helper('util:xmlRead')(text, opts, validate)
  }
}