const fs = require('fs')
const cheerio = require('cheerio')
const posts = require('../src/post.json')

posts.forEach(post => {
  const html = fs.readFileSync(`build/post/${post.slug}/index.html`, 'utf8')
  const content = fs.readFileSync(`../public/html/${post.slug}.html`, 'utf8')
  const $ = cheerio.load(html, {decodeEntities: false})
  $('article').html(content)
  fs.writeFile(`build/post/${post.slug}/index.html`, $.html(), (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`[GENERATED] build/post/${post.slug}/index.html`)
    }
  })
})
