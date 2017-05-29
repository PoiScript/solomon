import {Component, Injector} from '@angular/core';
import {SOLOMON_POST, Post} from '../../app.config';

@Component({
  selector: 'solomon-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  posts: Post[];

  constructor (injector: Injector) {
    const config = injector.get(SOLOMON_POST);
    this.posts = config.item;
  }
}
