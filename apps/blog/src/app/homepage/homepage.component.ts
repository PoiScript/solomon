import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PostDict, Post } from '@solomon/models';

import { POST_CONFIG } from '../post.config';

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
