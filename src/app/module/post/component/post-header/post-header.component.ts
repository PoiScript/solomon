import {animate, Component, Input, state, style, transition, trigger} from '@angular/core'

import {Intro} from '../../../../class/post'
import {ThemeService} from '../../../../service/theme'

@Component({
  selector: 'solomon-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss'],
  animations: [
    trigger('searchBarState', [
      state('true', style({width: '240px'})),
      state('false', style({width: '0'})),
      transition('1 => 0', animate(200)),
      transition('0 => 1', animate(200))
    ])
  ]
})
export class HeaderPostComponent {
  searchBarVisibility: boolean = false
  @Input() intro: Intro

  constructor(private themeService: ThemeService) {
  }

  toggleSearchBar(): void {
    this.searchBarVisibility = !this.searchBarVisibility
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }

  viewSource(): void {
    window.open(`/markdown/${this.intro.slug}.md`)
  }

}
