import { OnInit, ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../../app.models';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ post }) => {
      this.post = post;
      this.titleService.setTitle(post.title + '☆Solomon');
      this.cdRef.markForCheck();
    });
  }

  postTags(): string {
    return this.post.tags.map(tag => `#${tag}`).join(' ');
  }
}
