import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { Post } from '../models';

@Injectable({ providedIn: 'root' })
export class PostService {
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public posts$ = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  fetchPost(slug: string): Observable<SafeHtml> {
    return this.http
      .get<Post>(`/${slug}.json`)
      .pipe(map(res => this.sanitizer.bypassSecurityTrustHtml(res.html)));
  }

  fetchPostDict() {
    this.http
      .get<Post[]>('/posts.json')
      .pipe(
        tap(() => this.isLoading$.next(true)),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe(posts => this.posts$.next(posts));
  }
}
