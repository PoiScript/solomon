const fs = require('fs-extra')
const path = require('path')
const assets = path.resolve('assets')

const rss = require('./rss')
const render = require('./render')
const {posts} = require('../solomon.conf')

if (!fs.existsSync(path.join(assets, 'atom.xml'))) {
  console.info(`INFO: atom.xml doesn't exist, creating...`)
  fs.outputFileSync(
    path.join(assets, 'atom.xml'),
    rss(posts.sort((a, b) => (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0)))
  )
}

posts
  .filter(post => !fs.existsSync(path.join(assets, 'html', `${post.slug}.html`)))
  .map(post => {
    console.info(`INFO: ${post.slug}.html doesn't exist, creating...`)
    fs.outputFileSync(path.join(assets, 'html', `${post.slug}.html`), render(post))
  })
