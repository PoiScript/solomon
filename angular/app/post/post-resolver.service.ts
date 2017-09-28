import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PostResolve } from 'app/shared';
import { posts } from '../../../solomon.conf';
import { environment } from 'environments/environment';

@Injectable()
export class PostResolver implements Resolve<PostResolve> {
  constructor (private http: Http) {}

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostResolve> {
    const slug = route.paramMap.get('slug');
    const i = posts.findIndex(post => post.slug === slug);
    const next = posts[i - 1];
    const prior = posts[i + 1];
    const current = posts[i];

    return this.http
      .get(`${environment.origin_url}html/${current.slug}.html`)
      .map(res => res.text())
      .map(html => {
        return {current, prior, next, html};
      });
  }
}
