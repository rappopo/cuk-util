'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.lib
  const EasyXml = cuk.pkg.util.lib.EasyXml

  const traverse = function (o) {
    for (var i in o) {
      if (!!o[i] && typeof(o[i]) === "object") {
        /*
        if (_.isArray(o[i])) {
          _.each(o[i], v => {
            if (_.has(v, 'id')) {
              v._id = v.id
              delete v.id
            }
          })
        }
        */
        traverse(o[i])
      }
    }
  }

  return function(obj, manifest) {
    traverse(obj)
    const serializer = new EasyXml({
      manifest: manifest
    })

    return serializer.render(obj)
  }
}