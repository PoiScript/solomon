/*!
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , marked = require('marked').setOptions({ breaks: true })
  , mkmeta = require('marked-metadata')
  , moment = require('moment')

var config = JSON.parse(fs.readFileSync(process.cwd() + '/_config.json', 'utf8'))

/*!
 * Models
 */
var Page = require('./models/post')

/*!
 *Parse Markdown
 */
var posts = []
  , tags = []
config.posts.map((post) => {
  var md = new mkmeta(process.cwd() + '/posts/' + post)
  md.defineTokens('---')
  var meta = md.metadata()
  if (meta.tags) meta.tags = meta.tags.split(' ')
  posts.push(new Page({
    tags: meta.tags,
    title: meta.title,
    content: md.markdown(),
    date: moment(meta.time),
    layout: meta.layout,
    url: meta.url
  }))
})

/*!
 * Express setup.
 */
var app = express()
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/theme/layout')
app.use('/', express.static(process.cwd() + '/theme/public'))

/*!
 *Render pages
 */
app.get('/', (req, res) => {
  res.render('index')
})
app.get('/dashboard', (req, res) => {
  res.render('dashboard', {config: config, posts: posts})
})
app.get('/:page', (req,res) => {
  var page = req.params.page
  var post = posts.filter((post) => {
    return post.url === page
  })[0]
  if (post) {
    res.render(post.layout, {post: post})
  } else if (config.placeholder.includes(page)) {
    res.render(page, {config: config, posts: posts})
  }
})

/*!
 *Start server
 */
const server = http.createServer(app).listen(8080, (err) => {
  if (err) return error(err)
  const port = server.address().port
  console.log('Server listening on localhost:' + port)
})

function error(msg) {
  if (msg) return console.error(msg)
  return console.error('Error without error message!')
}