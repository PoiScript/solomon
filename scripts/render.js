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
  return {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://google.com/BlogPosting'
    },
    headline: post.title,
    image: {
      '@type': 'ImageObject',
      url: 'https://google.com/thumbnail1.jpg',
      height: 800,
      width: 800
    },
    datePublished: '2015-02-05T08:00:00+08:00',
    dateModified: '2015-02-05T09:20:00+08:00',
    author: {
      '@type': 'Person',
      name: 'PoiScript'
    },
    publisher: {
      '@type': 'Person',
      name: 'PoiScript',
      email: 'poiscript@gmail.com'
    },
    description: 'An about page for Solomon'
  }
}

module.exports = (post, amp = false) => {
  let html

  if (!amp) {
    html = marked(post.content)
  } else {
    html = compilePost({
      ...post,
      ld: getLinkedData(post),
      html: marked(post.content, {renderer: ampRenderer})
    })
  }

  return minify(html, {collapseWhitespace: true})
}
