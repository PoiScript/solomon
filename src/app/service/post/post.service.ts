import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import "rxjs/add/operator/toPromise"

import {Post} from "../../classes/Post"

@Injectable()
export class PostService {
	constructor(private http: Http) {}

	getArchive(): Promise<Post []> {
		return this.http.get(`https://github.com/PoiScript/Solomon-Post/blob/master/json/archive.json`)
			.toPromise()
			.then(res => res.json() as Post[])
			.catch(PostService.handleError)
	}

	getPost(slug: string): Promise<Post> {
		return this.http.get(`https://raw.githubusercontent.com/PoiScript/Solomon-Post/master/json/${slug}.json`)
			.toPromise()
			.then(res => res.json() as Post)
			.catch(PostService.handleError)
	}

	static handleError(error: any): Promise<any> {
		console.error('An error occurred', error)
		return Promise.reject(error.message || error)
	}
}