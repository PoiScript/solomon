import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Comment } from './comment.model';
import { environment } from 'environments/environment';

@Injectable()
export class CommentService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private baseUrl = environment.origin_url + 'api/comment/';

  constructor (private http: HttpClient) { }

  getComments (slug: string): Observable<Comment[]> {
    const url = this.baseUrl + slug;
    return this.http
      .get<{ data: Comment[] }>(url, {headers: this.headers})
      .map(res => res.data);
  }

  createComment (slug: string, uid: string, content: string): Observable<void> {
    const url = this.baseUrl + slug;
    const json = JSON.stringify({uid, content});
    return this.http
      .post(url, json, {headers: this.headers})
      .map(() => null);
  }

}
