const fs = require('fs')
const pug = require('pug')
const minify = require('html-minifier').minify
const posts = require('../post.json')
const ld = require('./linkedData')

const HTML_OUTPUT_DIR = 'dist/amp'

const compiledFunction = pug.compileFile('amp/views/post.pug')

if (!fs.existsSync(HTML_OUTPUT_DIR)) {
  fs.mkdirSync(HTML_OUTPUT_DIR)
}

posts.map(post => {
  const html = fs.readFileSync(`amp/html/${post.slug}.html`, 'utf8')
  const amphtml = compiledFunction({post: post, html: html, ld: ld.getLinkedData(post)})
  const mini = minify(amphtml, {collapseWhitespace: true, minifyCSS: true})
  fs.writeFile(`${HTML_OUTPUT_DIR}/${post.slug}.html`, mini, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`[GENERATED] ${post.slug}.html`)
    }
  })
})
