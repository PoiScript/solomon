import {Component, Input} from '@angular/core'

import {Intro} from '../../../../class/post'

@Component({
  selector: 'solomon-home-column',
  templateUrl: './home-column.component.html',
  styleUrls: ['./home-column.component.scss']
})
export class HomeColumnComponent {
  @Input() intro: Intro
}
