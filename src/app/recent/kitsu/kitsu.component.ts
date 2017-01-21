import {Component, OnInit} from "@angular/core"
import {KitsuService} from "../../service/kitsu"
import {Anime} from "../../classes/Anime"

@Component({
	selector: 'kitsu',
	templateUrl: './kitsu.component.html',
	styleUrls: ['./kitsu.component.css'],
	providers: [KitsuService]
})
export class KitsuComponent implements OnInit {
	animes: Anime[]

	constructor(private kitsuService: KitsuService) {
	}

	getAnimes(): void {
		this.kitsuService
			.getAnimes()
			.then(animes => this.animes = animes)
	}

	ngOnInit(): void {
		this.getAnimes()
	}
}