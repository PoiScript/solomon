const fs = require('fs')
const RSS = require('rss')
const render = require('./render')

const OUTPUT_DIR = 'dist'
const BLOG_TITLE = 'Solomon'
const BLOG_DESCRIPTION = 'PoiScript\'s Blog'
const BLOG_URL = 'https://poi.works'
const BLOG_LANGUAGE = 'zh-Hans'

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR)
}

const feed = new RSS({
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  generator: 'node-rss 1.2.2',
  feed_url: `${BLOG_URL}/atom.xml`,
  site_url: BLOG_URL,
  language: BLOG_LANGUAGE
})

const posts = render.parse()

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

fs.writeFile(`${OUTPUT_DIR}/atom.xml`, feed.xml(), (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('[GENERATED] atom.xml')
  }
})
