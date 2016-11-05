'use strict'

/*!
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')

//Local Modules
var config = require('./configure')
  , posts = require('./post')
  , routes = require('./routes')

//Environment
var app = express()
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/theme/layout')
app.use('/', express.static(process.cwd() + '/theme/public'))

routes(app, config, posts)

const server = http.createServer(app).listen(8080, (err) => {
  if (err) return error(err)
  const port = server.address().port
  console.log('Server listening on localhost:' + port)
})

function error(msg) {
  if (msg) return console.error(msg)
  return console.error('Error without message!')
}