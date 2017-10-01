import { Component, Inject } from '@angular/core';

import { AppConfig, APP_CONFIG } from 'app/app.config';
import { Post } from 'app/shared';

@Component({
  selector: 'solomon-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {
  posts: Post[];

  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.posts = config.posts;
  }
}
