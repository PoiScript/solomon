import {Component, Input} from '@angular/core'

import {Intro} from '../../../../class/post'
import {ThemeService} from '../../../../service/theme'

@Component({
  selector: 'solomon-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class HeaderPostComponent {
  @Input() intro: Intro

  constructor(private themeService: ThemeService) {
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }

}
