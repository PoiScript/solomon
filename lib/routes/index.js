module.exports = {
  index: (req, res) =>{
    res.render('index')
  },
  dashboard: (req, res) =>{
    res.render('dashboard', {
      config: file.config,
      posts: file.posts
    })
  },
  archive: (req, res) =>{
    var showBy = req.params.showBy
    if (file.config.archive.includes(showBy)){
      res.render('archive/' + showBy, {
        config: file.config,
        posts: file.posts
      })
    }
  },
}