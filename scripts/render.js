const fs = require('fs-extra')
const path = require('path')
const marked = require('marked')
const minify = require('html-minifier').minify
const assets = path.resolve('assets')

module.exports = (post) => {
  const markdown = fs.readFileSync(path.join(assets, 'markdown', `${post.slug}.md`), 'utf8')
  const html = marked(markdown)
  return minify(html, {collapseWhitespace: true})
}
