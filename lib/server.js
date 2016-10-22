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
  , Tag = require('./models/tag')
  , Category = require('./models/category')

/*!
 *Parse Markdown
 */
var posts = []
  , tags = []
  , categories = []
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
    url: post.replace(/ /g,"-").toLowerCase().split(".md")[0]
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
  res.render('index', {
    posts: posts
  })
})
app.get('/blog/:title', (req,res) => {
  var post = posts.filter((post) => {
    return post.url === req.params.title
  })[0]
  if(post) res.render('post', {post: post})
})
app.get('/:page', (req,res) => {
  if(config.pages.includes(req.params.page)) res.render(req.params.page)
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