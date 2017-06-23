const fs = require('fs')
const marked = require('marked')
const renderer = new marked.Renderer()

const MD_FILE_DIR = 'content'

renderer.image = (href, title, text) => {
  return `<amp-img src='${href}' layout='responsive' height='480' width='960'
  ${title ? `title='${title}'` : ''} ${text ? `alt='${text}'` : ''}>
  <noscript>
    <img src='${href}' ${title ? `title='${title}'` : ''} ${text ? `alt='${text}'` : ''} />
  </noscript>
</amp-img>`
}

module.exports.parse = (slug) => {
  const md = fs.readFileSync(`${MD_FILE_DIR}/${slug}.md`, 'utf8')

  const tokenEnd = md.indexOf('```', 1)

  return marked(md.substr(tokenEnd + 3), {renderer: renderer})
}
