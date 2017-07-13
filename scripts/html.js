const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

const htmlDir = path.resolve('public/html')
const jsonDir = path.resolve('public/post.json')
const buildDir = path.resolve('react/build/post')

const posts = require(jsonDir)

posts.map(post => {
  const html = fs.readFileSync(`${htmlDir}/${post.slug}.html`, 'utf8')
  const page = fs.readFileSync(`${buildDir}/${post.slug}/index.html`, 'utf8')
  const $ = cheerio.load(page, {decodeEntities: false})
  $('article').html(html)
  fs.writeFileSync(`${buildDir}/${post.slug}/index.html`, $.html())
})
