import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {Category} from "../../classes/Category"

@Injectable()
export class CategoryService {

	constructor(private http: Http) {
	}

	getCategories(): Promise<Category []> {
		return this.http.get('/post/json/categories.json')
			.toPromise()
			.then((res) => res.json() as Category)
	}
}