import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

import { PostService } from '../../service/post.service';

@Component({ templateUrl: './homepage.component.html' })
export class HomepageComponent {
  postDict = this.postService.posts$.pipe(map(dict => Object.values(dict)));

  constructor(private titleService: Title, private postService: PostService) {
    this.titleService.setTitle('solomon');
  }
}
