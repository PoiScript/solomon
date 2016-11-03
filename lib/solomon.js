/*!
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')

//Local Modules
var routes = require('./routes')
  , config = require('./configure')
  , posts = require('./post').loadConfig(config).log()
console.log(posts)
//Environment
var app = express()
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/theme/layout')
app.use('/', express.static(process.cwd() + '/theme/public'))

//Render pages
app.get('/', routes.index)
app.get('/dashboard', routes.dashboard)
app.get('/archive', routes.archive)

const server = http.createServer(app).listen(8080, (err) => {
  if (err) return error(err)
  const port = server.address().port
  console.log('Server listening on localhost:' + port)
})

function error(msg) {
  if (msg) return console.error(msg)
  return console.error('Error without message!')
}