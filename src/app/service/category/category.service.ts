import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {Category} from "../../classes/Category"
import {Subject} from "rxjs"

@Injectable()
export class CategoryService {

	constructor(private http: Http) {
	}

	getCategories(): Promise<Category []> {
		return this.http.get('/assets/post/categories.json')
			.toPromise()
			.then((res) => res.json() as Category)
	}

	private categoryAnnouncedSource = new Subject<Category>()

	categoryAnnounced$ = this.categoryAnnouncedSource.asObservable()

	announceCategory(category: Category){
		this.categoryAnnouncedSource.next(category)
	}
}