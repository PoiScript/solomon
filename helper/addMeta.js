/*!
 * Not Done Yet
 */

var fs = require('fs')
  , path = require('path')
  , mkmeta = require('marked-metadata')
  , meta = []

function readMeta (path){
  var files = fs.readdirSync(path)
  files.forEach(file => {
    var md = new mkmeta(path + '/' +file)
    md.defineTokens('---')
    meta.push(file, md.metadata())
  })
}

function writeMeta (){
  for (var i = 0; i < meta.length; i += 2) {
    meta[i + 1]
  }
}

readMeta('/home/poi/git/Solomon/posts')
console.log('Totally' + (meta.lenght / 2) + 'post(s) found.')