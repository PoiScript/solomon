import {
  Inject,
  OnInit,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../../app.models';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private cdRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ post }) => {
      this.post = post;
      this.titleService.setTitle(post.title + '☆Solomon');
      this.cdRef.markForCheck();
      let link = this.document.querySelector('link[rel="amphtml"]');
      if (!link) {
        link = this.document.createElement('link') as HTMLLinkElement;
        link.setAttribute('rel', 'amphtml');
        this.document.head.appendChild(link);
      }
      link.setAttribute('href', `https://blog.poi.cat/amp/${post.slug}`);
    });
  }

  postTags(): string {
    return this.post.tags.map(tag => `#${tag}`).join(' ');
  }
}
