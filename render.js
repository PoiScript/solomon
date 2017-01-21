let fs = require('fs')
let marked = require('marked')

let fileList = []
let postIntro = []
let posts = []

function walk(path) {
	fs.readdirSync(path)
		.forEach((item) => {
			if (fs.statSync(path + '/' + item).isDirectory())
				walk(path + '/' + item)
			else
				fileList.push(fs.readFileSync(path + '/' + item, 'utf8'))
		})
}

function parseFile(file) {
	let metaTokenStart = file.indexOf('```json')
	let metaTokenEnd = file.indexOf('```', 1)
	if (metaTokenStart === -1) return console.error('[ERROR] Markdown Metadata Missed')
	let post = JSON.parse(file.substr(metaTokenStart + 8, metaTokenEnd - 9))
	posts.push({
		category: post.category,
		title: post.title,
		slug: post.slug,
		date: new Date(post.date),
		raw: file.substr(metaTokenEnd + 3),
		html: marked(post['raw'])
	})
}

function generatePostJSON() {
	fileList.forEach((file) => {
		parseFile(file)

		fs.writeFile(`src/assets/post/${post.slug}.json`, JSON.stringify(post), (err) => {
			if (err) console.error(err)
			console.log(`[GENERATED] ${post.slug}.json`)
		})
	})
}

function generateCategoryJSON() {
	let categories = {}
	postIntro
		.map(post => post.category)
		.filter((post, index, self) => index === self.indexOf(post))
		.forEach(category => {
			categories.push({
				title: category,
				posts: postIntro.filter(post => category === post.category),
				count: postIntro.filter(post => category === post.category).length
			})
		})
	fs.writeFile("src/assets/post/categories.json", JSON.stringify(categories), (err) => {
		if (err) console.error(err)
		console.log("[GENERATED] categories.json")
	})
}

function generateArchiveJSON() {
	postIntro.sort((p1, p2) => p2.date - p1.date)
	fs.writeFile("src/assets/post/archive.json", JSON.stringify(postIntro), (err) => {
		if (err) console.error(err)
		console.log("[GENERATED] archive.json")
	})
}

walk('post')
console.log(`[INFO] ${fileList.length} file(s) found`)
generatePostJSON()
generateCategoryJSON()
generateArchiveJSON()
