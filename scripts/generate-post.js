const fs = require('fs')
const render = require('./render')

const XHR_PATH = '/assets/html'
const NG_HTML_OUTPUT_DIR = 'ng/src/assets/html'
const NG_JSON_OUTPUT_DIR = 'ng/src/assets/json'

const posts = render.parse()

posts.forEach(post => {
  if (!fs.existsSync(NG_HTML_OUTPUT_DIR)) {
    fs.mkdirSync(NG_HTML_OUTPUT_DIR)
  }

  fs.writeFile(`${NG_HTML_OUTPUT_DIR}/${post.slug}.html`, post.html, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`[GENERATED] ${post.slug}.html`)
    }
  })

  post.html = `${XHR_PATH}/${post.slug}.html`
})

if (!fs.existsSync(NG_JSON_OUTPUT_DIR)) {
  fs.mkdirSync(NG_JSON_OUTPUT_DIR)
}

fs.writeFile(`${NG_JSON_OUTPUT_DIR}/post.json`,
  JSON.stringify(posts.filter(post => post.slug !== 'about')),
  (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`[GENERATED] post.json`)
    }
  })
