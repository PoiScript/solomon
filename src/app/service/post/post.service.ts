import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import "rxjs/add/operator/toPromise"

import {Intro, Post} from "../../classes/Post"

@Injectable()
export class PostService {
	constructor(private http: Http) {
	}

	getArchive(): Promise<Intro []> {
		return this.http.get('/json/archive.json')
			.toPromise()
			.then(res => res.json() as Intro[])
			.catch(PostService.handleError)
	}

	getPost(slug: string): Promise<Post> {
		return this.http.get(`/json/${slug}.json`)
			.toPromise()
			.then(res => res.json() as Post)
			.catch(PostService.handleError)
	}

	static handleError(error: any): Promise<any> {
		console.error('An error occurred', error)
		return Promise.reject(error.message || error)
	}
}