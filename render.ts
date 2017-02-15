import fs = require('fs')
import marked = require('marked')
import cheerio = require('cheerio')
import path = require('path')
import {Post} from "./src/app/share/classes/Post"
import {Category} from "./src/app/share/classes/Category"
import {Link} from "./src/app/share/classes/Link"

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

function walk(walkPath) {
  fs.readdirSync(walkPath)
    .forEach(item => {
      if (fs.statSync(`${walkPath}/${item}`).isDirectory())
        walk(walkPath + '/' + item)
      else if (item === 'link.md')
        return
      else if (path.extname(item) === ".md")
        files.push(fs.readFileSync(`${walkPath}/${item}`, 'utf8'))
    })
}

function parse() {
  files
    .forEach(file => {
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
      if (post.intro.slug === 'about') {
        fs.writeFile(`src/json/about.json`, JSON.stringify(post), (err) => {
          if (err) console.error(err)
          console.log(`[GENERATED] about.json`)
        })
      } else {
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
      }
    })
}

function generateCategoryJSON() {
  let categories: Category[] = []
  posts
    .filter(post => post.intro.slug !== 'about')
    .forEach(post => {
      let i = categories.map(category => JSON.stringify(category.title)).indexOf(JSON.stringify(post.intro.category))
      if (i === -1)
        categories.push({title: post.intro.category, intros: [post.intro]} as Category)
      else
        categories[i].intros.push(post.intro)
    })
  categories.forEach(category => category.count = category.intros.length)
  fs.writeFile("src/json/categories.json", JSON.stringify(categories), (err) => {
    if (err) console.error(err)
    console.log("[GENERATED] categories.json")
  })
}

function generateArchiveJSON() {
  fs.writeFile("src/json/archive.json", JSON.stringify(posts.map(post => post.intro).filter(intro => intro.slug !== 'about')), (err) => {
    if (err) console.error(err)
    console.log("[GENERATED] archive.json")
  })
}

function generateLinkJSON(walkPath) {
  let links: Link[] = []
  let file = fs.readFileSync(`${walkPath}/link.md`, 'utf8')
  file
    .substring(file.indexOf('|:--:|:--:|:--:|:--:|:--:|') + 28, file.lastIndexOf('|')).split('|\n|')
    .forEach(line => {
      links.push({
        github_username: line.split('|')[0],
        display_name: line.split('|')[1],
        link_text: line.split('|')[2],
        link_address: line.split('|')[3],
        bio: line.split('|')[4] || ''
      })
    })
  fs.writeFile("src/json/link.json", JSON.stringify(links), (err) => {
    if (err) console.error(err)
    console.log("[GENERATED] link.json")
  })
}

walk('src/markdown')
console.log(`[INFO] ${files.length} files found.`)
parse()
generatePostJSON()
generateCategoryJSON()
generateArchiveJSON()
generateLinkJSON('src/markdown')
