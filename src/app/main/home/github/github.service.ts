import {Injectable} from "@angular/core"
import {Http} from "@angular/http"

@Injectable()
export class GitHubService {
	constructor(private _http: Http) {
	}

	getRepos() {
		return this._http.get('https://api.github.com/users/PoiScript/repos?type=all&sort=pushed')
			.map(res => res.json())
	}
}
