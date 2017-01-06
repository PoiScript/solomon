import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {config} from "../../../../config"

@Injectable()
export class GitHubService {
	constructor(private _http: Http) {
	}

	getRepos() {
		return this._http.get('https://api.github.com/users/'
			+ config.github_username + '/repos?'
			+ config.github_params)
			.map(res => res.json())
	}
}
