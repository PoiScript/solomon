import {Inject, Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {SolomonConfig} from "../../../../../share/interface/solomon-config"
import {CONFIG_TOKEN} from "../../../../../config"
import {Anime} from "../../../../../share/classes/Anime"


@Injectable()
export class KitsuService {
  private KITSU_ID: number
  private RECENT_ANIME_LIMIT: number

  constructor(private http: Http,
              @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.KITSU_ID = config.KITSU_ID
    this.RECENT_ANIME_LIMIT = config.RECENT_ANIME_LIMIT
  }

  getAnimes(): Promise<Anime[]> {
    return this.http.get(`https://kitsu.io/api/edge/library-entries?filter%5Buser_id%5D=${this.KITSU_ID}&filter%5Bmedia_type%5D=Anime&filter%5Bstatus%5D=1%2C3&include=media&sort=-updated_at&page%5Blimit%5D=${this.RECENT_ANIME_LIMIT}`)
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
