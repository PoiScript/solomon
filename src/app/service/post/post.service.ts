import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import "rxjs/add/operator/toPromise"

import {Post} from "./post"

@Injectable()
export class PostService {
	constructor(private http: Http) {}

	getArchive(): Promise<Post []> {
		return this.http.get('/assets/post/archive.json')
			.toPromise()
			.then(res => res.json() as Post[])
			.catch(this.handleError)
	}

	getPost(slug: string): Promise<Post> {
		return this.http.get(`/assets/post/${slug}.json`)
			.toPromise()
			.then(res => res.json() as Post)
			.catch(this.handleError)
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error)
		return Promise.reject(error.message || error)
	}
}