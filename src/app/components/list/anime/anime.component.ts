import {Component, Input} from "@angular/core"
import {Anime} from "../../../classes/Anime"

@Component({
	selector: 'anime-list',
	templateUrl: './anime.component.html',
	styleUrls: ['./anime.component.css']
})
export class AnimeListComponent {
	@Input() animes: Anime[]
}
