'use strict'

/*!
 * Module dependencies.
 */
var fs = require('fs')
  , moment = require('moment')
  , marked = require('marked')

function Post(paras) {
  this.path = paras.path
  this.title =  paras.title || '(No Title)'
  this.url = paras.url || ''
  this.tags = paras.tags || ''
  this.layout = paras.layout || 'post'
  this.comments =  paras.comments || true
  this.date =  paras.date || moment(Date.now())
  this.content =  paras.content || '(No Content)'
  this.raw = paras.raw
}

var _posts = JSON.parse(fs.readFileSync(process.cwd() + '/_posts.json', 'utf8'))
var posts = []
var path = process.cwd() + _posts.folder
_posts.filenames.map((filename) => {
  var file = fs.readFileSync(path + filename, 'utf8').split('---')
  var meta = parseMeta(file[1])
  posts.push(new Post({
    path: path + filename,
    tags: meta.tags,
    title: meta.title,
    raw: file[2],
    content: marked(file[2]),
    date: moment(meta.time),
    layout: meta.layout,
    url: meta.url,
  }))
})

function parseMeta(data) {
  var result = {}
    , pairs = data.trim().split('\n')
  pairs.forEach((pair, i) => {
    var arr = pair.trim().split(':')
    result[arr.shift()] = arr.join(':').trim()
  })
  if (result.tags) result.tags = result.tags.split(' ')
  else result.tags = []
  return result
}

module.exports = posts