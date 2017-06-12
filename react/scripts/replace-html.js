const fs = require('fs')
const cheerio = require('cheerio')

const output = []
const posts = []

fs.readdirSync('build/post').forEach(item => {
  output.push({
    filename: item.slice(0, -5),
    content: fs.readFileSync(`build/post/${item}`, 'utf8')
  })
})

fs.readdirSync('src/html').forEach(item => {
  posts.push({
    filename: item.slice(0, -5),
    content: fs.readFileSync(`src/html/${item}`, 'utf8')
  })
})

output.forEach(i => {
  const $ = cheerio.load(i.content, { decodeEntities: false })
  $('article').html(posts.find(p => p.filename === i.filename).content)
  fs.writeFile(`build/post/${i.filename}.html`, $.html(), (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`[GENERATED] ${i.filename}.html`)
    }
  })
})
