import {Component, OnInit} from '@angular/core';

import {PostService} from '../../service/post';
import {Intro} from '../../class/post';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  intros: Intro[];

  constructor (private postService: PostService) {}

  getRecent (): void {
    this.postService
      .getRecent()
      .then(intros => this.intros = intros);
  }

  ngOnInit (): void {
    this.getRecent();
  }
}
