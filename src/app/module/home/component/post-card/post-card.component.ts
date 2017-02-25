import {Component, Input, OnInit} from '@angular/core'
import {Intro} from '../../../../class/post'

@Component({
  selector: 'solomon-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() intro: Intro

  constructor() {
  }

  ngOnInit() {
  }

}
