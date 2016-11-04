'use strict'

module.exports = function(app, config, posts) {
  app.get('/', (req, res) =>{
    res.render('index')
  })
  app.get('/dashboard', (req, res) =>{
    res.render('dashboard', {
      posts: posts,
      config: config,
    })
  })
  app.get('/post/:url', (req, res) => {
    var post = posts.filter((post) => {
      return post.url === req.params.url
    })[0]
    if (post)
      post.layout = post.layout || 'post'
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
}