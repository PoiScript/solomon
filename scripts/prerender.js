require('zone.js/dist/zone-node')
require('reflect-metadata')
const fs = require('fs')
const path = require('path')
const {renderModuleFactory} = require('@angular/platform-server')
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader')

const dist = path.resolve('dist')

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(path.join(dist, 'dist-server/main.bundle'))

const index = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

renderFactory('')
renderFactory('/about')
renderFactory('/link')

function renderFactory (url) {
  renderModuleFactory(AppServerModuleNgFactory, {
    url: url,
    document: index,
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  }).then(html => {
    if (!fs.existsSync(path.join(dist, url))) {
      fs.mkdirSync(path.join(dist, url))
    }
    fs.writeFileSync(path.join(dist, `${url}/index.html`), html)
  })
}
