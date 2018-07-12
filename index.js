'use strict'

module.exports = function(cuk) {
  const { path } = cuk.pkg.core.lib
  return Promise.resolve({
    id: 'util',
    level: 3,
    lib: {
      xml: require('fast-xml-parser'),
      yaml: require('js-yaml'),
      coBody: require('co-body')
    }
  })
}