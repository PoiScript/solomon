import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {config} from "../../../../config"

@Injectable()
export class KitsuService {
	constructor(private _http: Http) {
	}

	getAnime() {
		return this._http.get('https://kitsu.io/api/edge/library-entries?' + config.kitsu_params)
			.map(res => res.json())
	}

}
