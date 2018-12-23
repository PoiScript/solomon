import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs/operators';

import { PostService } from '../../service';

@Component({ templateUrl: './tag.component.html' })
export class TagComponent {
  tag$ = this.route.paramMap.pipe(map(paramMap => paramMap.get('tag')));

  posts$ = this.tag$.pipe(
    tap(tag => this.titleService.setTitle(`#${tag}☆Solomon`)),
    mergeMap(tag =>
      this.postService.posts$.pipe(
        map(posts => posts.filter(p => p.tags.includes(tag))),
      ),
    ),
  );

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {}
}
