import {Component, OnInit} from "@angular/core"
import {KitsuService} from "./kitsu.service"
import {Anime} from "./anime"
import {LibraryEntry} from "./libraryEntry"

@Component({
	selector: 'kitsu',
	templateUrl: './kitsu.component.html',
	styleUrls: ['./kitsu.component.css'],
	providers: [KitsuService]
})
export class KitsuComponent implements OnInit {
	animes: Anime[]

	constructor(private _kitsuService: KitsuService) {
	}

	ngOnInit() {
		this._kitsuService.getAnime()
			.subscribe(
				data => this.animes = parseKitsuApiJSON(data),
				err => alert(err),
				() => console.log('GitHub Repo Refreshed.')
			)
	}
}

function parseKitsuApiJSON(data): Anime[] {
	let animes: Anime[] = []
	let libraryEntries: LibraryEntry[]
	return animes
}
