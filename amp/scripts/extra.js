const fs = require('fs')
const pug = require('pug')
const path = require('path')
const minify = require('html-minifier').minify
const posts = require('../public/post.json')
const ld = require('./linkedData')
const parse = require('./render').parse

const dir = path.resolve('../dist/amp')

const compiledFunction = pug.compileFile('views/post.pug')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

posts.map(post => {
  const amphtml = compiledFunction({post: post, html: parse(post.slug), ld: ld.getLinkedData(post)})
  const mini = minify(amphtml, {collapseWhitespace: true, minifyCSS: true})
  fs.writeFile(`${dir}/${post.slug}.html`, mini, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`[GENERATED] ${post.slug}.html`)
    }
  })
})
