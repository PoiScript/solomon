import fs = require('fs')
import marked = require('marked')
import cheerio = require('cheerio')
import {Post} from "./src/app/classes/Post"
import {Category} from "./src/app/classes/Category"

let renderer = new marked.Renderer()

renderer.heading = (text: string, level: number) => {
  let escapedText = text.replace(/[^\u2E80-\u9FFF|^\w]+/g, '-')

  return `
		<h${level} id="${escapedText}">
			<a class="anchor" name="${escapedText}" href="#${escapedText}">
				<span class="header-link"></span>
			</a>${text}
		</h${level}>
	`
}

let files: string[] = []
let posts: Post[] = []

function walk(path) {
  fs.readdirSync(path)
    .forEach((item) => {
      if (fs.statSync(path + '/' + item).isDirectory())
        walk(path + '/' + item)
      else
        files.push(fs.readFileSync(path + '/' + item, 'utf8'))
    })
}

function parse() {
  files.forEach(file => {
    let tokenStart = file.indexOf('```json')
    let tokenEnd = file.indexOf('```', 1)
    if (tokenStart === -1) return console.error('[ERROR] Markdown Metadata Missed')
    let post = new Post()
    post.intro = JSON.parse(file.substr(tokenStart + 8, tokenEnd - 9))
    post.html = marked(file.substr(tokenEnd + 3), {renderer: renderer})
    post.bookmark = []
    let $ = cheerio.load(post.html)
    $('.anchor').each((i, item) => {
      post.bookmark.push(item.attribs['name'] as string)
    })
    posts.push(post as Post)
  })
}

function generatePostJSON() {
  posts
    .sort((p1: Post, p2: Post) => Date.parse(p1.intro.date) - Date.parse(p2.intro.date))
    .forEach((post: Post, index) => {
      if (index > 0) {
        post.previous_title = posts[index - 1].intro.title
        post.previous_slug = posts[index - 1].intro.slug
      }
      if (index < files.length - 1) {
        post.next_title = posts[index + 1].intro.title
        post.next_slug = posts[index + 1].intro.slug
      }
      fs.writeFile(`src/json/${post.intro.slug}.json`, JSON.stringify(post), (err) => {
        if (err) console.error(err)
        console.log(`[GENERATED] ${post.intro.slug}.json`)
      })
    })
}

function generateCategoryJSON() {
  let categories: Category[] = []
  posts
    .forEach(post => {
      let i = categories.map(category => JSON.stringify(category.title)).indexOf(JSON.stringify(post.intro.category))
      if (i === -1)
        categories.push({title: post.intro.category, intros: [post.intro]} as Category)
      else
        categories[i].intros.push(post.intro)
    })
  categories
    .forEach(category => category.count = category.intros.length)
  fs.writeFile("src/json/categories.json", JSON.stringify(categories), (err) => {
    if (err) console.error(err)
    console.log("[GENERATED] categories.json")
  })
}

function generateArchiveJSON() {
  fs.writeFile("src/json/archive.json", JSON.stringify(posts.map(post => post.intro)), (err) => {
    if (err) console.error(err)
    console.log("[GENERATED] archive.json")
  })
}

walk('src/markdown')
console.log(`[INFO] ${files.length} file(s) found.`)
parse()
generatePostJSON()
generateCategoryJSON()
generateArchiveJSON()
