'use strict'

module.exports = function(cuk) {
  const { path } = cuk.lib
  return Promise.resolve({
    id: 'util',
    level: 3,
    lib: {
      EasyXml: require('easyxml'),
      yaml: require('js-yaml')
    }
  })
}