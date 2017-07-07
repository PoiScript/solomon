const fs = require('fs')
const path = require('path')
const marked = require('marked')
const renderer = new marked.Renderer()

const dir = path.resolve('../public/content')

renderer.image = (href, title, text) => {
  return `<amp-img src='${href}' layout='responsive' height='480' width='960'
  ${title ? `title='${title}'` : ''} ${text ? `alt='${text}'` : ''}>
  <noscript>
    <img src='${href}' ${title ? `title='${title}'` : ''} ${text ? `alt='${text}'` : ''} />
  </noscript>
</amp-img>`
}

module.exports.parse = (slug) => {
  const md = fs.readFileSync(`${dir}/${slug}.md`, 'utf8')

  const tokenEnd = md.indexOf('```', 1)

  return marked(md.substr(tokenEnd + 3), {renderer: renderer})
}
