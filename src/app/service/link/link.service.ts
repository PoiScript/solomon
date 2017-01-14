import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {Link} from "./link"

@Injectable()
export class LinkService {

	constructor(private http: Http) {
	}

	getLinks(): Promise<Link[]> {
		return this.http.get('/assets/link.json')
			.toPromise()
			.then(res => res.json() as Link[])
	}
}