import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Post, PostConfig, POST_CONFIG } from 'app/shared';

@Component({
  selector: 'solomon-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {

  posts: Post[];

  constructor (@Inject(POST_CONFIG) config: PostConfig,
               private titleService: Title) {
    this.posts = config.posts;
    this.titleService.setTitle('solomon');
  }

}
