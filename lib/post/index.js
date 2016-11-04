'use strict'

/*!
 * Module dependencies.
 */
var fs = require('fs')
  , path = require('path')
  , moment = require('moment')
  , mkmeta = require('marked-metadata')

var posts

function Post(paras) {
  this.path = paras.path
  this.title =  paras.title || '(No Title)'
  this.url = paras.url || ''
  this.tags = paras.tags || ''
  this.layout = paras.layout || 'post'
  this.comments =  paras.comments || true
  this.date =  paras.date || moment(Date.now())
  this.content =  paras.content || '(No Content)'
}

function parsePost(posts, folder) {
  var newPosts = []
  var postPath = process.cwd() + folder
  posts.map((post) => {
    var md = new mkmeta(postPath + post)
    md.defineTokens('---')
    var meta = md.metadata()
    if (meta.tags)
      meta.tags = meta.tags.split(' ')
    else
      meta.tags = []
    newPosts.push(new Post({
      tags: meta.tags,
      title: meta.title,
      content: md.markdown(),
      date: moment(meta.time),
      layout: meta.layout,
      url: meta.url
    }))
  })
  posts = newPosts
  return posts
}

module.exports = {
  init: (config) => {
    return parsePost(config.posts, config.post_folder)
  },
  sort: (sortBy) => {
    posts.sort((a,b) => {
      return (a[sortBy] < b[sortBy])? -1:((a[sortBy] > b[sortBy])? 1:0)
    })
  }
}