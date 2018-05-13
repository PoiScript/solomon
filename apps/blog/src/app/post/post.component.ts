import { Component } from '@angular/core';
import { SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Post, PostResolve } from '@solomon/models';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  html: SafeHtml;
  post: Post;

  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.route.data.subscribe(({ resolve }: { resolve: PostResolve }) => {
      this.post = resolve.post;
      this.html = resolve.html;
      this.titleService.setTitle(this.post.title + ' | solomon');
    });
  }
}
