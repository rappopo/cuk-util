'use strict'

module.exports = function (cuk) {
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
