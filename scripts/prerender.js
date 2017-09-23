require('zone.js/dist/zone-node')
require('reflect-metadata')
const fs = require('fs-extra')
const path = require('path')
const cheerio = require('cheerio')
const {renderModuleFactory} = require('@angular/platform-server')
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader')

const assets = path.resolve('assets')
const dist = path.resolve('dist')
const {posts} = require('../solomon.conf')
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(path.join(dist, 'dist-server/main.bundle'))
const index = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

let urls = ['/', '/about/', '/link/']

posts.forEach(post => {
  urls = urls.concat([...post.tags.map(tag => `/tag/${tag}/`)])
})

urls
  .filter((url, index, self) => self.indexOf(url) === index)
  .forEach(url => {
    renderFactory(url)
      .then(html => fs.outputFileSync(path.join(dist, `${url}index.html`), html))
  })

posts.forEach(post => {
  const post_html = fs.readFileSync(path.join(assets, 'html', `${post.slug}.html`), 'utf8')
  renderFactory(`/post/${post.slug}/`)
    .then(html => cheerio.load(html, {decodeEntities: false}))
    .then($ => $('article').html(post_html))
    .then(html => fs.outputFileSync(path.join(dist, `${post.slug}/index.html`), html))
})

function renderFactory (url) {
  return renderModuleFactory(AppServerModuleNgFactory, {
    url: url,
    document: index,
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  })
}
