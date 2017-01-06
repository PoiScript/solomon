import {Component, OnInit} from "@angular/core"
import {KitsuService} from "./kitsu.service"
import {Anime} from "./anime"
import {config} from "../../../../config"

@Component({
	selector: 'kitsu',
	templateUrl: './kitsu.component.html',
	styleUrls: ['./kitsu.component.css'],
	providers: [KitsuService]
})
export class KitsuComponent implements OnInit {
	username: string = config.kitsu_username

	animes: Anime[]
	updatedAt: string

	constructor(private _kitsuService: KitsuService) {
	}

	ngOnInit() {
		this._kitsuService.getAnime()
			.subscribe(
				data => {
					this.animes = parseKitsuApiJSON(data)
					let date = new Date(data.data[0].attributes.updatedAt)
					this.updatedAt = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
				},
				err => alert(err),
				() => console.log('Anime Refreshed.')
			)
	}
}

function parseKitsuApiJSON(data): Anime[] {
	let animes: Anime[] = []
	let len = data.included.length
	for (let i = 0; i < len; i++) {
		if (data.data[i].relationships.media.data.id === data.included[i].id)
			animes.push(new Anime(data.included[i], data.data[i]))
	}
	return animes
}
