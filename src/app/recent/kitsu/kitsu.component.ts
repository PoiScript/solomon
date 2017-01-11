import {Component} from "@angular/core"
import {KitsuService} from "../../service/kitsu"
import {Anime} from "../../service/kitsu/anime"
import {api} from "../../../config/api"
import {Entry} from "../../service/kitsu/entry"

@Component({
	selector: 'kitsu',
	templateUrl: './kitsu.component.html',
	styleUrls: ['./kitsu.component.css'],
	providers: [KitsuService]
})
export class KitsuComponent {
	username: string = api.kitsu_username
	entries: Entry[]
	animes: Anime[]

	constructor(private kitsuService: KitsuService) {
	}

	// getAnimes(): void {
	// 	this.kitsuService
	// 		.getAnimes()
	// 		.then(animes => this.animes = animes)
	// }
	//
	// getEntries(): void {
	// 	this.kitsuService
	// 		.getEntries()
	// 		.then(entries => this.entries = entries)
	// }
	//
	// ngOnInit(): void {
	// 	this.getAnimes()
	// 	this.getEntries()
	// }
}