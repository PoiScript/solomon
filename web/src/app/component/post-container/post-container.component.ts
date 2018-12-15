import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs/operators';

import { PostService } from '../../service/post.service';

@Component({
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent {
  slug$ = this.route.paramMap.pipe(map(paramMap => paramMap.get('slug')));

  post$ = this.slug$.pipe(
    mergeMap(slug =>
      this.postService.posts$.pipe(
        map(posts => posts.find(p => p.slug === slug)),
      ),
    ),
    tap(post => {
      if (post) {
        this.titleService.setTitle(post.title + ' | solomon');
      }
    }),
  );

  html$ = this.slug$.pipe(mergeMap(slug => this.postService.fetchPost(slug)));

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private postService: PostService,
  ) {}
}
