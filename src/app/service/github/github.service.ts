import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {Repo} from "../../classes/Repo"
import {Comment} from "../../classes/Comment"

@Injectable()
export class GitHubService {
	private repoUrl: string = 'https://api.github.com/users/PoiScript/repos?type=all&sort=pushed'
	private commentUrl: string = `https://api.github.com/repos/nodejs/node/issues`

	constructor(private http: Http) {
	}

	getRepos(): Promise<Repo[]> {
		return this.http.get(this.repoUrl)
			.toPromise()
			.then(res => res.json() as Repo[])
	}

	getIssueComments(issueNumber: Number): Promise<Comment[]> {
		if (!issueNumber) issueNumber = 5731
		return this.http.get(`${this.commentUrl}/${issueNumber}/comments`)
			.toPromise()
			.then(res => res.json() as Comment[])
	}
}