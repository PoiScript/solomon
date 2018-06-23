import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { PostDict } from '../models';

@Injectable({ providedIn: 'root' })
export class PostService {
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public posts$ = new BehaviorSubject<PostDict>({});

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  fetchPost(slug: string): Observable<SafeHtml> {
    return this.http
      .get(`/html/${slug}.html`, { responseType: 'text' })
      .pipe(map(html => this.sanitizer.bypassSecurityTrustHtml(html)));
  }

  fetchPostDict() {
    this.http
      .get<PostDict>('/posts.json')
      .pipe(
        tap(() => this.isLoading$.next(true)),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe(posts => this.posts$.next(posts));
  }
}
