'use strict'

module.exports = (app, config, posts) => {
  app.get('/dashboard', (req, res) => {
    console.log(posts.getAll())
    res.render('dashboard', {
      posts: posts.getAll(),
      config: config,
    })
  })
  app.get('/', (req, res) => {
    res.render('index')
  })
  app.get('/:url', (req, res) => {
    var url = req.params.url
    var post = posts.get(url)
    if (post) res.render(post.layout, {post: post})
    else if (config.pages.includes(url))
      res.render(url, {
        posts: posts,
        config: config
      })
    else
      res.status(404).send('Not found')
  })
}