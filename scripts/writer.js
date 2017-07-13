const fs = require('fs')
const path = require('path')
const rss = require('./rss')
const render = require('./render')

const output = path.resolve('public')
const ampDir = path.resolve('public/amp')
const htmlDir = path.resolve('public/html')
const reactSrcDir = path.resolve('react/src')
const markdownDir = path.resolve('public/markdown')

if (!fs.existsSync(ampDir)) {
  fs.mkdirSync(ampDir)
}

if (!fs.existsSync(htmlDir)) {
  fs.mkdirSync(htmlDir)
}

const posts = []

fs.readdirSync(markdownDir).forEach(item => {
  if (path.extname(item) === '.md') {
    const markdown = fs.readFileSync(`${markdownDir}/${item}`, 'utf8')

    const tokenStart = markdown.indexOf('```json')
    const tokenEnd = markdown.indexOf('```', 1)

    if (tokenStart === -1) {
      console.error('[ERROR] Markdown Metadata Missed')
      return
    }

    const post = JSON.parse(markdown.substr(tokenStart + 8, tokenEnd - 9))

    if (post.tags) {
      post.tags = post.tags.map(tag => tag.toLowerCase())
      post.tags.sort()
    }

    posts.push(post)

    post.content = markdown.substr(tokenEnd + 3)

    fs.writeFileSync(`${htmlDir}/${post.slug}.html`, render(post))

    fs.writeFileSync(`${ampDir}/${post.slug}.html`, render(post, true))
  }
})

posts.sort((a, b) => (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0))

fs.writeFileSync(`${output}/atom.xml`, rss(posts))

const json = JSON.stringify(posts.map(p => {
  delete p.ld
  delete p.html
  delete p.content
  return p
}))

fs.writeFileSync(`${output}/post.json`, json)
fs.writeFileSync(`${reactSrcDir}/post.json`, json)
