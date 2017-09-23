const RSS = require('rss')
const rss_pkg = require('rss/package')

const render = require('./render')

const BLOG_TITLE = 'Solomon'
const BLOG_DESCRIPTION = 'PoiScript\'s Blog'
const BLOG_URL = 'https://blog.poi.cat'
const BLOG_LANGUAGE = 'zh-Hans'

module.exports = (posts) => {
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    generator: `node-rss ${rss_pkg.version}`,
    feed_url: `${BLOG_URL}/atom.xml`,
    site_url: BLOG_URL,
    language: BLOG_LANGUAGE
  })

  posts.forEach(post => {
    const html = render(post)
    feed.item({
      title: post.title,
      description: html,
      url: `${BLOG_URL}/post/${post.slug}`,
      guid: post.slug,
      categories: post.tags,
      author: 'PoiScript',
      date: post.date
    })
  })

  return feed.xml()
}
