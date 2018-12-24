import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs/operators';

import { PostService } from '../../service';
import { Post } from '../../model';

@Component({
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostContainerComponent {
  post: Post;

  post$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('slug')),
    mergeMap(slug =>
      this.postService.posts$.pipe(
        map(posts => posts.find(p => p.slug === slug)),
      ),
    ),
    tap(post => {
      if (post) {
        this.titleService.setTitle(post.title + '☆Solomon');
      }
    }),
  );

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private postService: PostService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('slug')),
        mergeMap(slug => this.postService.fetchPost(slug)),
      )
      .subscribe(post => {
        this.post = post;
        this.cdRef.detectChanges();
      });
  }
}
