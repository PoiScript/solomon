var fs = require('fs')

module.exports.config = JSON.parse(fs.readFileSync(process.cwd() + '/_config.json', 'utf8'))