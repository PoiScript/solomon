/*!
 * Module dependencies.
 */

var path = require('path')
  , fs = require('fs')
  , Page = require('./models/page')
  , moment = require('moment')
  , mkmeta = require('marked-metadata')

var config = JSON.parse(fs.readFileSync(process.cwd() + '/_config.json', 'utf8'))

/*!
 *Parse Markdown
 */
var posts = []
config.posts.map((post) => {
  var md = new mkmeta(process.cwd() + '/posts/' + post)
  md.defineTokens('---')
  var meta = md.metadata()
  if (meta.tags)
    meta.tags = meta.tags.split(' ')
  posts.push(new Page({
    tags: meta.tags,
    title: meta.title,
    content: md.markdown(),
    date: moment(meta.time),
    layout: meta.layout,
    url: meta.url
  }))
})

module.exports = {
  config: config,
  posts: posts
}