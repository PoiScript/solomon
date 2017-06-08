const fs = require('fs')
const path = require('path')
const marked = require('marked')

const MD_FILE_DIR = 'content'

module.exports.parse = () => {
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
    }

    posts.push({
      title: info.title || 'not title',
      slug: info.slug || 'not slug',
      date: info.date || 'not date',
      summary: info.summary || 'not summary',
      tags: info.tags || [],
      html: marked(file.substr(tokenEnd + 3).trim())
    })
  }

  posts.sort((p1, p2) => Date.parse(p1.date) - Date.parse(p2.date))

  return posts
}
