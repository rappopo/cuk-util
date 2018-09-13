'use strict'

const he = require('he')

module.exports = function (cuk) {
  return new Promise((resolve, reject) => {
    resolve({
      common: {
        json: {
          contentType: 'application/vnd.api+json; application/json; text/json; charset=utf-8'
        },
        xml: {
          contentType: 'application/xml; text/xml; charset=utf-8',
          wrapperDoc: 'document',
          parserOpts: {
            attributeNamePrefix: '@_',
            attrNodeName: '@',
            textNodeName: '#text',
            ignoreAttributes: true,
            cdataTagName: '__cdata',
            cdataPositionChar: '\\c',
            format: false,
            indentBy: '  ',
            supressEmptyNode: false,
            tagValueProcessor: a => he.encode(a, {
              useNamedReferences: true
            }),
            attrValueProcessor: a => he.encode(a, {
              isAttributeValue: true,
              useNamedReferences: true
            })
          }
        },
        yml: {
          contentType: 'application/x-yaml; text/yaml; charset=utf-8',
          parserOpts: {}
        }
      }
    })
  })
}
