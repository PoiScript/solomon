import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {Anime} from "../../classes/Anime"


@Injectable()
export class KitsuService {

	constructor(private http: Http) {
	}

	getAnimes(): Promise<Anime[]> {
		return this.http.get('https://kitsu.io/api/edge/library-entries?filter%5Buser_id%5D=140033&filter%5Bmedia_type%5D=Anime&filter%5Bstatus%5D=1%2C3&include=media&sort=-updated_at&page%5Blimit%5D=6')
			.toPromise()
			.then(res => {
				let animes: Anime[] = []
				let json = res.json()
				let len = json.included.length
				for (let i = 0; i < len; i++)
					animes.push(Object.assign(json.included[i].attributes, json.data[i].attributes))
				return animes
			})
	}
}