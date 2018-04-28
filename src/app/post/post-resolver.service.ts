import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Post, POST_CONFIG, PostConfig, PostResolve } from 'app/shared';

@Injectable()
export class PostResolver implements Resolve<PostResolve> {
  readonly posts: Post[] = this.config.posts;

  constructor(
    @Inject(POST_CONFIG) private config: PostConfig,
    private http: HttpClient,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<PostResolve> {
    const slug = route.paramMap.get('slug');
    const i = this.posts.findIndex(post => post.slug === slug);

    return this.http
      .get(`/html/${slug}.html`, { responseType: 'text' })
      .pipe(
        map(html => ({
          html,
          next: this.posts[i - 1],
          prior: this.posts[i + 1],
          current: this.posts[i],
        })),
      );
  }
}
