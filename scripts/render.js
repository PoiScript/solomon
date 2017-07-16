const pug = require('pug')
const marked = require('marked')
const minify = require('html-minifier').minify
const ampRenderer = new marked.Renderer()

ampRenderer.image = (href, title, text) => {
  return `<amp-img src='${href}' layout='responsive' height='480' width='960'
  ${title ? `title='${title}'` : ''} ${text ? `alt='${text}'` : ''}>
  <noscript>
    <img src='${href}' ${title ? `title='${title}'` : ''} ${text ? `alt='${text}'` : ''} />
  </noscript>
</amp-img>`
}

const compilePost = pug.compileFile('amp/post.pug')

function getLinkedData (post) {
  return JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://google.com/BlogPosting'
    },
    headline: post.title,
    image: {
      '@type': 'ImageObject',
      url: 'https://blog.poi.cat/icon.png',
      height: 192,
      width: 192
    },
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'PoiScript'
    },
    publisher: {
      '@type': 'Person',
      name: 'PoiScript',
      email: 'poiscript@gmail.com'
    },
    description: post.title
  })
}

module.exports = (post, amp = false) => {
  let html

  if (!amp) {
    html = marked(post.content)
  } else {
    post.ld = getLinkedData(post)
    post.html = marked(post.content, {renderer: ampRenderer})
    html = compilePost(post)
  }

  return minify(html, {collapseWhitespace: true, minifyCSS: true})
}
