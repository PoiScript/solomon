import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {Category} from "./category"
import "rxjs/add/operator/toPromise"
import {Post} from "./post"

@Injectable()
export class PostService {

	constructor(private http: Http) {
	}

	getCategories(): Promise<Category []> {
		return this.http.get('/assets/post/categories.json')
			.toPromise()
			.then(res => res.json() as Category[])
			.catch(this.handleError)
	}

	getPost(path: string): Promise<Post> {
		return this.http.get(`/assets/post/${path}.json`)
			.toPromise()
			.then(res => res.json() as Post)
	}

	getPostByPath() {
		return this.http.get('/assets/post/example-0.json')
			.map(res => res.json())
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error)
		return Promise.reject(error.message || error)
	}
}