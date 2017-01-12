let fs = require('fs')
let marked = require('marked')

let fileList = []
let postList = []

function walk(path) {
	let dirList = fs.readdirSync(path)
	dirList.forEach((item) => {
		if (fs.statSync(path + '/' + item).isDirectory())
			walk(path + '/' + item)
		else
			fileList.push(fs.readFileSync(path + '/' + item, 'utf8'))
	})
	console.log(fileList.length + " file(s) found.")
}

function generatePostJSON() {
	fileList.forEach((file) => {
		let metaTokenStart = file.indexOf('```json')
		let metaTokenEnd = file.indexOf('```', 1)
		if (metaTokenStart === -1) return console.error('Markdown Metadata Missed.')
		let post = JSON.parse(file.substr(metaTokenStart + 8, metaTokenEnd - 9))
		postList.push({
			category: post.category,
			title: post.title,
			slug: post.slug,
			date: new Date(post.date)
		})
		post['raw'] = file.substr(metaTokenEnd + 3)
		post['html'] = marked(post['raw'])
		fs.writeFile(`src/assets/post/${post.slug}.json`, JSON.stringify(post), (err) => {
			if (err) console.error(err)
			console.log(`${post.slug}.json generated.`)
		})
	})
}

function generateCategoryJSON() {
	let temp = {}
	let categories = []
	postList.forEach((post) => {
		if (post.category in temp)
			temp[post.category].push(post)
		else
			temp[post.category] = [post]
	})
	for (let k in temp) {
		categories.push({
			title: k,
			count: temp[k].length,
			posts: temp[k]
		})
	}
	fs.writeFile("src/assets/post/categories.json", JSON.stringify(categories), (err) => {
		if (err) console.error(err)
		console.log("categories.json generated.")
	})
}

function generateArchiveJSON() {
	postList.sort((p1, p2) => {
		return p2.date - p1.date
	})
	fs.writeFile("src/assets/post/archive.json", JSON.stringify(postList), (err) => {
		if (err) console.error(err)
		console.log("archive.json generated.")
	})
}

walk('post')
generatePostJSON()
generateCategoryJSON()
generateArchiveJSON()
