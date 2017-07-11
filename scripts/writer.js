const fs = require('fs')
const path = require('path')
const rss = require('./rss')
const render = require('./render')

const output = path.resolve('public')
const ampDir = path.resolve('public/amp')
const htmlDir = path.resolve('public/html')
const markdownDir = path.resolve('public/markdown')

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

    fs.writeFile(`${htmlDir}/${post.slug}.html`, render(post), (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log(`[GENERATED] ${htmlDir}/${post.slug}.html`)
      }
    })

    fs.writeFile(`${ampDir}/${post.slug}.html`, render(post, true), (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log(`[GENERATED] ${ampDir}/${post.slug}.html`)
      }
    })
  }
})

fs.writeFile(`${output}/post.json`, JSON.stringify(posts.map(p => delete p.content)), (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`[GENERATED] ${output}/post.json`)
  }
})

fs.writeFile(`${output}/atom.xml`, rss(posts), (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`[GENERATED] ${output}/atom.xml`)
  }
})
