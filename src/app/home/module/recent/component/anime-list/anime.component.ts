import {Component, Input} from '@angular/core'
import {Anime} from '../../../../../share/classes/Anime'

@Component({
  selector: 'anime-list',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeListComponent {
  @Input() animes: Anime[]

  animeClicked(slug: string) {
    window.open(`https://kitsu.io/anime/${slug}`)
  }
}
