import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {api} from "../../../config/api"
import {Repo} from "../../classes/Repo"

@Injectable()
export class GitHubService {
	private url: string = 'https://api.github.com/users/' + api.github_username + '/repos?' + api.github_params

	constructor(private http: Http) {
	}

	getRepos(): Promise<Repo[]> {
		return this.http.get(this.url)
			.toPromise()
			.then(res => res.json() as Repo[])
	}
}