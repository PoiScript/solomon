'use strict'

/*!
 * Module dependencies.
 */
var fs = require('fs')

module.exports = {
  saveMeta: (path, jsonData) => {
    var str = JSON.stringify(jsonData).slice(1,-1).replace(/"/g, '').replace(/,/g, '\n')
    var original = fs.readFileSync(path, 'utf-8').split('---\n')
    original[1] = data
    fs.writeFileSync(path, original.join('---\n'))
  },
  saveContent: (path, data) => {
    var original = fs.readFileSync(path, 'utf-8').split('---\n')
    original[2] = data
    fs.writeFileSync(path, original.join('---\n'))
  }
}