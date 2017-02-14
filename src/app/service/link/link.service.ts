import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {Link} from "../../classes/Link"

@Injectable()
export class LinkService {
  links: Link[]

  constructor(private http: Http) {
  }

  getLinks(): Promise<Link[]> {
    if (this.links) return new Promise(resolve => resolve(this.links))
    return this.http.get('/json/link.json')
      .toPromise()
      .then(res => res.json() as Link[])
      .then(links => this.links = links)
  }
}
