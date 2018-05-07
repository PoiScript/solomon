import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostDict, PostResolve } from 'app/models';
import { POST_CONFIG } from 'app/post.config';

@Injectable()
export class PostResolver implements Resolve<PostResolve> {
  readonly posts: PostDict = this.postConfig;

  constructor(
    @Inject(POST_CONFIG) private postConfig: PostDict,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<PostResolve> {
    const slug = route.paramMap.get('slug');
    const post = this.posts[slug];

    return this.http
      .get(`/html/${slug}.html`, { responseType: 'text' })
      .pipe(
        map(html => this.sanitizer.bypassSecurityTrustHtml(html)),
        map(html => ({ html, post })),
      );
  }
}
