import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../service';
import { Post } from '../../model';

@Component({
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostContainerComponent {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private postService: PostService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.route.data.subscribe(({ post }) => {
      this.post = post;
      this.titleService.setTitle(post.title + '☆Solomon');
      this.postService.fetchPost(post.slug).subscribe(post => {
        this.post.html = post.html;
        this.post.next = post.next;
        this.post.prior = post.prior;
        this.cdRef.detectChanges();
      });
    });
  }
}
