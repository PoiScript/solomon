import {Component} from "@angular/core"
import {KitsuService} from "../../service/kitsu"
import {Anime} from "../../service/kitsu/anime"
import {api} from "../../../config/api"

@Component({
	selector: 'kitsu',
	templateUrl: './kitsu.component.html',
	styleUrls: ['./kitsu.component.css'],
	providers: [KitsuService]
})
export class KitsuComponent {
	username: string = api.kitsu_username
	animes: Anime[]

	constructor(private kitsuService: KitsuService) {
	}

	getAnimes(): void {
		this.kitsuService
			.getAnimes()
			.then(animes => {
				this.animes = animes
				console.log(animes)
			})
	}

	ngOnInit(): void {
		this.getAnimes()
	}
}