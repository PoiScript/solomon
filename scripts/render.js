const fs = require('fs')
const path = require('path')
const marked = require('marked')
const minify = require('html-minifier').minify

module.exports.parse = (dir) => {
  const files = []

  fs.readdirSync(dir).forEach(item => {
    if (path.extname(item) === '.md' && item !== 'link.md') {
      files.push(fs.readFileSync(`${dir}/${item}`, 'utf8'))
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

    const html = marked(file.substr(tokenEnd + 3).trim())

    posts.push({
      title: info.title || 'not title',
      slug: info.slug || 'not slug',
      date: info.date || 'not date',
      tags: info.tags || [],
      html: minify(html, { collapseWhitespace: true })
    })
  }

  posts.sort((p1, p2) => Date.parse(p2.date) - Date.parse(p1.date))

  return posts
}
