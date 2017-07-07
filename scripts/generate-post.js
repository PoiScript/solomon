const fs = require('fs')
const path = require('path')
const parse = require('./render').parse

const posts = parse(path.resolve('public/content'))

if (!fs.existsSync('public/html')) {
  fs.mkdirSync('public/html')
}

posts.forEach(post => {
  fs.writeFile(`public/html/${post.slug}.html`, post.html, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`[GENERATED] ${post.slug}.html`)
    }
  })

  delete post.html
})

fs.writeFile('public/post.json', JSON.stringify(posts), (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('[GENERATED] post.json')
  }
})
