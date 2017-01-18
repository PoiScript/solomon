import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {BookCollections} from "../../classes/BookCollections"

@Injectable()
export class BookService {

	constructor(private http: Http) {
	}

	getBooks(): Promise<BookCollections[]> {
		return this.http.get('https://api.douban.com/v2/book/user/156034233/collections')
			.toPromise()
			.then(res => res.json().collections as BookCollections[])
	}
}
