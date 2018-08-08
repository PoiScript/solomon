import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { Post, PostResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class PostService {
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public posts$ = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  fetchPost(slug: string): Observable<Post> {
    this.isLoading$.next(true);
    return this.http.get<PostResponse>(`/${slug}.json`).pipe(
      map(res => {
        this.sanitizer.bypassSecurityTrustHtml(res.html);
        return res;
      }),
      finalize(() => this.isLoading$.next(false)),
    );
  }

  fetchPostDict() {
    this.http
      .get<Post[]>('/posts.json')
      .subscribe(posts => this.posts$.next(posts));
  }
}
