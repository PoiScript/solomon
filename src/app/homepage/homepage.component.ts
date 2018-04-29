import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { POST_CONFIG } from 'app/post.config';
import { PostDict, Post } from 'app/models';

@Component({ templateUrl: './homepage.component.html' })
export class HomepageComponent {
  readonly posts: Post[] = Object.values(this.postDict);

  constructor(
    @Inject(POST_CONFIG) private postDict: PostDict,
    private titleService: Title,
  ) {
    this.titleService.setTitle('solomon');
  }
}
