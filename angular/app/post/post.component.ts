import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Post } from 'app/shared/post.model';
import { posts } from '../../../solomon.conf';

@Component({
  selector: 'solomon-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  prior: Post;
  current: Post;
  next: Post;

  constructor (private route: ActivatedRoute) { }

  ngOnInit () {
    this.route.params.subscribe((params: Params) => {
      const i = posts.findIndex(post => post.slug === params.slug);
      this.prior = posts[i + 1];
      this.current = posts[i];
      this.next = posts[i - 1];
    });
  }
}
