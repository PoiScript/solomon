'use strict'

var fs = require('fs')

module.exports = JSON.parse(fs.readFileSync(process.cwd() + '/_config.json', 'utf8'))