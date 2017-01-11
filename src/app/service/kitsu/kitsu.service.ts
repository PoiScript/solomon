import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {api} from "../../../config/api"
import {Anime} from "./anime"
import {Entry} from "./entry"


@Injectable()
export class KitsuService {
	private url: string = 'https://kitsu.io/api/edge/library-entries?' + api.kitsu_params

	constructor(private http: Http) {
	}

	getAnimes(): Promise<Anime[]> {
		return this.http.get(this.url)
			.toPromise()
			.then(res => res.json().included as Anime[])
	}

	getEntries(): Promise<Entry[]> {
		return this.http.get(this.url)
			.toPromise()
			.then(res => res.json().data as Entry[])
	}
}