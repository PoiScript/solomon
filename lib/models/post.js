var moment = require('moment')

var Post = function (paras) {
  this.title =  paras.title || '(No Title)'
  this.url = paras.url || ''
  this.tags = paras.tags || ''
  this.layout = paras.layout || 'post'
  this.comments =  paras.comments || true
  this.date =  paras.date || moment(Date.now())
  this.content =  paras.content || ''
}

module.exports = Post