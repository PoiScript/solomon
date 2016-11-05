'use strict'

module.exports = function(app, config, posts) {
  app.get('/', (req, res) => {
    res.render('index')
  })
  app.get('/post/:url', (req, res) => {
    var post = posts.get(req.params.url)
    if (post)
      res.render(post.layout, {post: post})
  })
  app.get('/:page', (req, res) => {
    var page = req.params.page
    if (config.pages.includes(page))
      res.render(page, {
        posts: posts,
        config: config
      })
  })
  app.get('/dashboard', (req, res) => {
    console.log(posts.getAll())
    res.render('dashboard', {
      posts: posts.getAll(),
      config: config,
    })
  })
}