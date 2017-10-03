import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AppConfig, APP_CONFIG } from 'app/app.config';
import { Post } from 'app/shared';

@Component({
  selector: 'solomon-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {
  posts: Post[];

  constructor (@Inject(APP_CONFIG) config: AppConfig,
               private titleService: Title) {
    this.posts = config.posts;
    this.titleService.setTitle('solomon');
  }
}
