/*!
 * Module dependencies.
 */
var fs = require('fs')
  , path = require('path')
  , moment = require('moment')
  , mkmeta = require('marked-metadata')

var posts

function readPost(posts, folder) {
  var newPosts = []
  var postPath = process.cwd() + folder
  posts.map((post) => {
    var md = new mkmeta(postPath + post)
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
}
//
// /*!
//  *Parse Markdown
//  */
// var posts = []
// config.posts.map((post) => {
//   var md = new mkmeta(process.cwd() + '/posts/' + post)
//   md.defineTokens('---')
//   var meta = md.metadata()
//   if (meta.tags)
//     meta.tags = meta.tags.split(' ')
//   posts.push(new Page({
//     tags: meta.tags,
//     title: meta.title,
//     content: md.markdown(),
//     date: moment(meta.time),
//     layout: meta.layout,
//     url: meta.url
//   }))
// })
//
// var moment = require('moment')
//
// var Post = function (paras) {
//   this.path = paras.path
//   this.title =  paras.title || '(No Title)'
//   this.url = paras.url || ''
//   this.tags = paras.tags || ''
//   this.layout = paras.layout || 'post'
//   this.comments =  paras.comments || true
//   this.date =  paras.date || moment(Date.now())
//   this.content =  paras.content || ''
// }
//
// Post.prototype.sort = function (sortBy) {
//   this.sort((a,b) => {
//     if (a[sortBy] < b[sortBy])
//       return -1
//     if (a[sortBy] > b[sortBy])
//       return 1
//     return 0
//   })
// }
//
exports = {
  init: (config) => {
    readPost(config.posts, config.post_folder)
    return posts
  }
}