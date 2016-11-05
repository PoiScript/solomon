'use strict'

/*!
 * Module dependencies.
 */
var fs = require('fs')

module.exports = (path, data) => {
  fs.writeFile(path, data)
}