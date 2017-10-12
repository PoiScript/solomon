import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Comment } from './comment.model';
import { environment } from 'environments/environment';

@Injectable()
export class CommentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private postsUrl = `${environment.origin_url}api/comment`;

  constructor (private http: Http) { }

  getComments (slug: string): Observable<Comment[]> {
    const url = `${this.postsUrl}/${slug}`;
    return this.http.get(url)
      .map(res => res.json().data);
  }

  createComment (slug: string, uid: string, content: string): Observable<void> {
    const url = `${this.postsUrl}/${slug}`;
    const json = JSON.stringify({uid, content});
    return this.http
      .post(url, json, {headers: this.headers})
      .map(() => null);
  }

}
