var moment = require('moment')

var Post = function (paras) {
  this.title =  paras.title || ''
  this.date =  paras.date || moment(Date.now())
  this.comments =  paras.comments || true
  this.content =  paras.content || ''
  this.url = paras.url || ''
  this.tags = paras.tags || ''
}

module.exports = Post