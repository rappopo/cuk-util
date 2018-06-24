module.exports = function(cuk) {
  return new Promise((resolve, reject) => {
    let cfg = cuk.pkg.rest.cfg.common.supportedFormats
    cfg.push('xml', 'yml')
    cfg = _.uniq(cfg)
    resolve(true)
  })
}