const fs = require('fs')
const path = require('path')
const fileList = []
const ignoreFiles = ['index.html', '200.html']

function walk (dir) {
  const dirList = fs.readdirSync(dir)
  dirList.forEach(item => {
    if (item !== 'html') { // skip html directory
      const _path = `${dir}/${item}`
      if (fs.statSync(_path).isDirectory()) {
        walk(_path)
      } else if (path.extname(item) === '.html') {
        fileList.push(_path)
      }
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
