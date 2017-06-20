const fs = require('fs')
const path = require('path')
const marked = require('marked')
const renderer = new marked.Renderer()
const minify = require('html-minifier').minify

const MD_FILE_DIR = 'content'
const HTML_OUTPUT_DIR = 'amp/html'

renderer.image = (href, title, text) => {
  return `<amp-img src='${href}' layout='responsive' height='480' width='960'
  ${title ? `title=${title}` : ''} ${text ? `alt=${text}` : ''}>
  <noscript>
    <img src='${href}' ${title ? `title=${title}` : ''} ${text ? `alt=${text}` : ''} />
  </noscript>
</amp-img>`
}

const files = []

fs.readdirSync(MD_FILE_DIR).forEach(item => {
  if (path.extname(item) === '.md' && item !== 'link.md') {
    files.push(fs.readFileSync(`${MD_FILE_DIR}/${item}`, 'utf8'))
  }
})

const posts = []

for (const file of files) {
  const tokenStart = file.indexOf('```json')
  const tokenEnd = file.indexOf('```', 1)

  if (tokenStart === -1) {
    console.error('[ERROR] Markdown Metadata Missed')
    continue
  }

  const info = JSON.parse(file.substr(tokenStart + 8, tokenEnd - 9))

  if (info.tags) {
    info.tags = info.tags.map(tag => tag.toLowerCase())
    info.tags.sort()
  }

  const html = marked(file.substr(tokenEnd + 3).trim(), { renderer: renderer })

  posts.push({
    title: info.title || 'not title',
    slug: info.slug || 'not slug',
    date: info.date || 'not date',
    tags: info.tags || [],
    html: minify(html, { collapseWhitespace: true })
  })
}

posts.sort((p1, p2) => Date.parse(p2.date) - Date.parse(p1.date))

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
})
