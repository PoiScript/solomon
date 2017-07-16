const RSS = require('rss')

const BLOG_TITLE = 'Solomon'
const BLOG_DESCRIPTION = 'PoiScript\'s Blog'
const BLOG_URL = 'https://blog.poi.cat'
const BLOG_LANGUAGE = 'zh-Hans'

module.exports = (posts) => {
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    generator: 'node-rss 1.2.2',
    feed_url: `${BLOG_URL}/atom.xml`,
    site_url: BLOG_URL,
    language: BLOG_LANGUAGE
  })

  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.html,
      url: `${BLOG_URL}/post/${post.slug}`,
      guid: post.slug,
      categories: post.tags,
      author: 'PoiScript',
      date: post.date
    })
  })

  return feed.xml()
}
