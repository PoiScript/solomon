'use strict'

exports.index = function(req, res){
  res.render('index')
}

exports.dashboard = function(req, res){
  res.render('dashboard', {
    config: file.config,
    posts: file.posts
  })
}

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

exports.path = function (req,res){
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