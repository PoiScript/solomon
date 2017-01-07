import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {api} from "../../../config/api"

@Injectable()
export class GitHubService {
	constructor(private _http: Http) {
	}

	getRepos() {
		return this._http.get('https://api.github.com/users/'
			+ api.github_username + '/repos?'
			+ api.github_params)
			.map(res => res.json())
	}
}
