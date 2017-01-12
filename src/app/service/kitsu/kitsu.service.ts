import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {api} from "../../../config/api"
import {Anime} from "./anime"


@Injectable()
export class KitsuService {
	private url: string = 'https://kitsu.io/api/edge/library-entries?' + api.kitsu_params

	constructor(private http: Http) {
	}

	getAnimes(): Promise<Anime[]> {
		return this.http.get(this.url)
			.toPromise()
			.then(res => {
				let animes: Anime[] = []
				let json = res.json()
				let len = json.included.length
				for (let i = 0; i < len; i ++)
					animes.push(Object.assign(json.included[i].attributes, json.data[i].attributes))
				return animes
			})
	}
}