import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {api} from "../../../config/api"
import {Repo} from "../../classes/Repo"
import {Comment} from "../../classes/Comment"

@Injectable()
export class GitHubService {
	private repoUrl: string = `https://api.github.com/users/${api.github_username}/repos?${api.github_params}`

	constructor(private http: Http) {
	}

	getRepos(): Promise<Repo[]> {
		return this.http.get(this.repoUrl)
			.toPromise()
			.then(res => res.json() as Repo[])
	}

	getIssueComments(): Promise<Comment[]> {
		return this.http.get("https://api.github.com/repos/nodejs/node/issues/5731/comments")
			.toPromise()
			.then(res => res.json() as Comment[])
	}
}