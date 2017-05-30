import {Component, Injector} from '@angular/core';
import {SOLOMON_POST, Post} from 'app/app.config';

@Component({
  selector: 'solomon-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  about_post: Post;

  constructor (injector: Injector) {
    this.about_post = injector.get(SOLOMON_POST).item.find(i => i.title === 'string');
  }
}
