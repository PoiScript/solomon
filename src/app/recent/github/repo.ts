export class Repo {
	name: string
	html_url: string
	description: string
	fork: boolean
	language: string

	constructor(repo) {
		this.name = repo.name
		this.html_url = repo.html_url
		this.description = repo.description
		this.fork = repo.fork
		this.language = repo.language
	}
}