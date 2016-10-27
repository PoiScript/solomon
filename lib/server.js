/*!
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , moment = require('moment')

var file = require('./file')
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
  res.render('dashboard', {
    config: file.config,
    posts: file.posts
  })
})
app.post('/dashboard/posts/:url', (req, res) => {
  var post = file.posts.filter((post) => {
    return post.url === req.params.url
  })[0]
})
app.get('/archive/:showBy', (req, res) => {
  var showBy = req.params.showBy
  if (file.config.archive.includes(showBy))
    res.render('archive/' + showBy, {
      config: file.config,
      posts: file.posts})
})
app.get('/:page', (req,res) => {
  var page = req.params.page
  var post = file.posts.filter((post) => {
    return post.url === page
  })[0]
  if (post)
    res.render(post.layout, {post: post})
  else if (file.config.placeholder.includes(page))
    res.render('placeholder/' + page, {
      config: file.config,
      posts: file.posts
    })
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
  return console.error('Error without message!')
}