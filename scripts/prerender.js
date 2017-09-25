require('zone.js/dist/zone-node')
require('reflect-metadata')
const fs = require('fs-extra')
const path = require('path')
const {minify} = require('html-minifier')
const {renderModuleFactory} = require('@angular/platform-server')
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader')

const assets = path.resolve('assets')
const dist = path.resolve('dist')
const {posts} = require('../solomon.conf')
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(path.join(dist, 'dist-server/main.bundle'))
const index = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

let urls = ['', '/about', '/link']

posts.forEach(post => {
  urls.push(`/post/${post.slug}`)
  post.tags.map(tag => urls.push(`/tag/${tag}`))
})

urls
  .filter((url, index, self) => self.indexOf(url) === index)
  .forEach(url => {
    renderFactory(url)
      .then(html =>
        minify(html, {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true
        }))
      .then(html => fs.outputFileSync(path.join(dist, url, 'index.html'), html))
  })

function renderFactory (url) {
  return renderModuleFactory(AppServerModuleNgFactory, {
    url: url,
    document: index,
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  })
}
