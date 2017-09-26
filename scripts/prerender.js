require('zone.js/dist/zone-node')
require('reflect-metadata')
const fs = require('fs-extra')
const {join, resolve} = require('path')
const {minify} = require('html-minifier')
const {renderModuleFactory} = require('@angular/platform-server')
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader')

const dist = resolve('dist')
const {posts} = require('../solomon.conf')
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(join(dist, 'dist-server/main.bundle'))
const index = fs.readFileSync(join(dist, 'index.html'), 'utf8')

let urls = ['/', '/about', '/link']

posts.forEach(post => {
  urls.push(join('/post', post.slug))
  post.tags.map(tag => urls.push(join('/slug', tag)))
})

urls
  .filter((url, index, self) => self.indexOf(url) === index)
  .forEach(url => renderToStatic(url, join(dist, url, 'index.html')))

renderToStatic('/404', join(dist, '404.html'))

function renderToStatic (url, path) {
  renderModuleFactory(AppServerModuleNgFactory, {
    url: url,
    document: index,
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  }).then(html => minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true
  }))
    .then(html => {
      console.info(`Saving "${url}" as "${path}"`)
      fs.outputFileSync(path, html)
    })
}
