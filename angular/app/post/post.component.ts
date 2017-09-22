import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Post } from 'app/app.types';
import { PostService } from 'app/shared/post-service';

@Component({
  selector: 'solomon-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  prior: Post;
  current: Post;
  next: Post;

  constructor (private postService: PostService,
               private route: ActivatedRoute) { }

  ngOnInit () {
    this.route.params.subscribe((params: Params) =>
      [this.current, this.prior, this.next] = this.postService.getPostBySlug(params['slug']));
  }
}
