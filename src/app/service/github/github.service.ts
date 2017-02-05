import {Injectable} from "@angular/core"
import {Headers, Http} from "@angular/http"
import {Repo} from "../../classes/Repo"
import {Comment} from "../../classes/Comment"
import {SearchResult} from "../../classes/SearchResult"

@Injectable()
export class GitHubService {

	constructor(private http: Http) {
	}

	getRepos(): Promise<Repo[]> {
		return this.http.get('https://api.github.com/users/PoiScript/repos?type=all&sort=pushed')
			.toPromise()
			.then(res => res.json() as Repo[])
	}

	getIssueComments(number: Number): Promise<Comment[]> {
		let headers = new Headers()
		headers.append('Accept', 'application/vnd.github.squirrel-girl-preview')
		return this.http.get(`https://api.github.com/repos/PoiScript/Solomon-Post/issues/${number}/comments`, {
			headers: headers
		}).toPromise()
			.then(res => res.json() as Comment[])
	}

	searchCode(keyword: string): Promise<SearchResult> {
		let headers = new Headers()
		headers.append('Accept', 'application/vnd.github.v3.text-match+json')
		return this.http.get(`https://api.github.com/search/code?q=repo:PoiScript/Solomon-Post+${keyword}`, {
			headers: headers
		}).toPromise()
			.then(res => res.json() as SearchResult)
	}
}