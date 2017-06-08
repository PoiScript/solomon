const fs = require('fs')
const render = require('./render')

const HTML_OUTPUT_DIR = 'public/html'
const JSON_OUTPUT_DIR = 'public/json'

const posts = render.parse()

posts.forEach(post => {
  if (!fs.existsSync(HTML_OUTPUT_DIR)) {
    fs.mkdirSync(HTML_OUTPUT_DIR)
  }

  fs.writeFile(`${HTML_OUTPUT_DIR}/${post.slug}.html`, post.html, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`[GENERATED] ${post.slug}.html`)
    }
  })

  delete post.html
})

if (!fs.existsSync(JSON_OUTPUT_DIR)) {
  fs.mkdirSync(JSON_OUTPUT_DIR)
}

fs.writeFile(`${JSON_OUTPUT_DIR}/post.json`,
  JSON.stringify(posts.filter(post => post.slug !== 'about')),
  (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`[GENERATED] post.json`)
    }
  })
