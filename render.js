let fs = require('fs')
let marked = require('marked')

let postList = []
let categoryList = []

function walk(path) {
	let dirList = fs.readdirSync(path)
	dirList.forEach((item) => {
		if (fs.statSync(path + '/' + item).isDirectory())
			walk(path + '/' + item)
		else
			postList.push(fs.readFileSync(path + '/' + item, 'utf8'))
	})
	console.log(postList.length + " file(s) found.")
}

function generatePostJSON() {
	postList.forEach((post) => {
		let metaTokenStart = post.indexOf('```json')
		let metaTokenEnd = post.indexOf('```', 1)
		if (metaTokenStart === -1) return console.error('Markdown Metadata Missed.')
		let meta = JSON.parse(post.substr(metaTokenStart + 8, metaTokenEnd - 9))
		categoryList.push({
			category: meta.category,
			title: meta.title,
			path: meta.path,
			date: meta.date
		})
		meta['raw'] = post.substr(metaTokenEnd + 3)
		meta['html'] = marked(meta['raw'])
		console.log(JSON.stringify(meta))
		fs.writeFile(`src/assets/post/${meta.path}.json`, JSON.stringify(meta), (err) => {
			if (err) console.error(err)
			console.log(`${meta.path}.json generated.`)
		})
	})
}

function generateCategoryJSON() {
	let categories = {}
	categoryList.forEach((post) => {
		if (post.category in categories)
			categories[post.category].push(post)
		else
			categories[post.category] = [post]
	})
	fs.writeFile("src/assets/post/categories.json", JSON.stringify(categories), (err) => {
		if (err) console.error(err)
		console.log("categories.json generated.")
	})
}

walk('post')
generatePostJSON()
generateCategoryJSON()
