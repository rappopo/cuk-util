module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib

  return new Promise((resolve, reject) => {
    if (!cuk.pkg.rest) return resolve(true)
    let cfg = cuk.pkg.rest.cfg.supportedFormats
    cfg.push('xml', 'yml')
    cfg = _.uniq(cfg)
    resolve(true)
  })
}
