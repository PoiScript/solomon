import {Component, OnInit} from "@angular/core"
import {KitsuService} from "./kitsu.service"
import {Anime} from "./anime"
import {api} from "../../../config/api"

@Component({
	selector: 'kitsu',
	templateUrl: './kitsu.component.html',
	styleUrls: ['./kitsu.component.css'],
	providers: [KitsuService]
})
export class KitsuComponent implements OnInit {
	username: string = api.kitsu_username

	animeLeft: Anime[] = []
	animeRight: Anime[] = []
	updatedAt: string

	constructor(private _kitsuService: KitsuService) {
	}

	ngOnInit() {
		this._kitsuService.getAnime()
			.subscribe(
				data => {
					let i = 0
					for (; i <= 2; i++)
						if (data.data[i].relationships.media.data.id === data.included[i].id)
							this.animeLeft.push(new Anime(data.included[i], data.data[i]))
					for (; i <= 5; i++)
						if (data.data[i].relationships.media.data.id === data.included[i].id)
							this.animeRight.push(new Anime(data.included[i], data.data[i]))
					let date = new Date(data.data[0].attributes.updatedAt)
					this.updatedAt = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
				},
				err => alert(err),
				() => console.log('Anime Refreshed.')
			)
	}
}