'use strict'

var save = require('./save')
  , posts = require('./parse')

module.exports = {
  get: (url) => {
    return posts.filter((post) => {
      return post.url === url
    })[0]
  },
  getAll: () => {
    return posts
  },
  sort: (sortBy, start, end) => {
    start = start || 0
    end = end || posts.length
    return posts.slice(start, end).sort((a,b) => {
      return (a[sortBy] < b[sortBy])? -1:((a[sortBy] > b[sortBy])? 1:0)
    })
  },
  save: (path, data) => {
    save(path, data)
  }
}