var moment = require('moment')

var Post = function (paras) {
  this.path = paras.path
  this.title =  paras.title || '(No Title)'
  this.url = paras.url || ''
  this.tags = paras.tags || ''
  this.layout = paras.layout || 'post'
  this.comments =  paras.comments || true
  this.date =  paras.date || moment(Date.now())
  this.content =  paras.content || ''
}

Post.prototype.sort = function (sortBy) {
  this.sort((a,b) => {
    if (a[sortBy] < b[sortBy])
      return -1
    if (a[sortBy] > b[sortBy])
      return 1
    return 0
  })
}

Post.prototype.replace = function (post) {
  this = post
}

module.exports = Post