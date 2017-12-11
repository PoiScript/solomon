import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { APP_CONFIG, AppConfig } from 'app/app.config';
import { LoadingService } from 'app/core';
import { Post, PostResolve } from 'app/shared';
import { environment } from 'environments/environment';

const RESOLVED_KEY = makeStateKey<PostResolve>('resolved');

@Injectable()
export class PostResolver implements Resolve<PostResolve> {

  private posts: Post[];

  constructor (@Inject(APP_CONFIG) private config: AppConfig,
               @Inject(PLATFORM_ID) private platformId: Object,
               private state: TransferState,
               private loadingService: LoadingService,
               private http: HttpClient) {
    this.posts = config.posts;
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostResolve> {
    const slug = route.paramMap.get('slug');
    const resolved = this.state.get(RESOLVED_KEY, null);

    if (resolved && resolved.current.slug === slug) {
      // if the state exists and matches the slug,
      // remove it and return null to tell the component do nothing
      this.state.remove(RESOLVED_KEY);
      return resolved;
    } else {
      const i = this.posts.findIndex(post => post.slug === slug);
      const next = this.posts[i - 1];
      const prior = this.posts[i + 1];
      const current = this.posts[i];

      this.loadingService.show();

      return this.http
        .get(`${environment.origin_url}html/${current.slug}.html`, {responseType: 'text'})
        .map(html => {
          const resolve = {current, prior, next, html};

          // only save the state in the server platform
          if (isPlatformServer(this.platformId)) {
            this.state.set(RESOLVED_KEY, resolve);
          }

          return resolve;
        })
        .finally(() => this.loadingService.hide());
    }
  }

}
