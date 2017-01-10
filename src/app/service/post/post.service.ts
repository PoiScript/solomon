import {Injectable} from "@angular/core"
import {Http} from "@angular/http"

@Injectable()
export class PostService {
	constructor(private _http: Http) {
	}

	getAllCategories() {
		return this._http.get('/assets/post/categories.json')
			.map(res => res.json())
	}

	getPostByPath() {
		return this._http.get('/assets/post/example-0.json')
			.map(res => res.json())
	}
}