const fs = require('fs')
const path = require('path')
const fileList = []
const ignoreFiles = ['index.html', '200.html']

function walk (dir) {
  const dirList = fs.readdirSync(dir)
  dirList.forEach(item => {
    if (fs.statSync(dir + '/' + item).isDirectory()) {
      walk(dir + '/' + item)
    } else if (path.extname(item) === '.html') {
      fileList.push(dir + '/' + item)
    }
  })
}

walk('build')

fileList
  .filter(file => !ignoreFiles.includes(path.basename(file)))
  .map(file => {
    const newPath = file.replace('.html', '')
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath)
    }
    fs.renameSync(file, newPath + '/index.html')
  })
