import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Post } from '../model';
import { PostService } from './post.service';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<Post> {
  constructor(private postService: PostService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    return this.postService.posts$.pipe(
      take(1),
      map(posts => posts.find(p => p.slug === route.paramMap.get('slug'))),
    );
  }
}
