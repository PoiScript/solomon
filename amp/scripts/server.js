const fs = require('fs')
const express = require('express')
const app = express()
const minify = require('html-minifier').minify
const posts = require('../post.json')
const ld = require('./linkedData')

app.set('views', 'amp/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('homepage', {posts: posts})
})

app.get('/post/:slug', (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug)
  if (!post) {
    res.status(404).send('Not found')
  }
  const html = fs.readFileSync(`amp/html/${post.slug}.html`, 'utf8')
  res.render('post', {post: post, html: html, ld: ld.getLinkedData(post)}, (err, html) => {
    if (err) {
      console.log(err)
    }
    res.send(minify(html, {collapseWhitespace: true, minifyCSS: true}))
  })
})

app.listen(3000, () => {
  console.log('Dev Server listening on port 3000!')
})
