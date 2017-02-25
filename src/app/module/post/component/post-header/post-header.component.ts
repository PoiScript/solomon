import {Component, Input} from '@angular/core'
import {Location} from '@angular/common'

import {Intro} from '../../../../class/post'

@Component({
  selector: 'solomon-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class HeaderPostComponent {
  @Input() intro: Intro

  constructor(private location: Location) {
  }

  backClicked(): void {
    this.location.back()
  }
}
