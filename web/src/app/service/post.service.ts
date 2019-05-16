import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Post, PostGroup } from '../model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private aboutCache: SafeHtml | null = null;
  private groupCache: PostGroup[] | null = null;

  constructor(private http: HttpClient, private sanitized: DomSanitizer) {}

  fetchPost(slug: string): Observable<Post> {
    return this.http.get<Post>(`/post/${slug}.json`);
  }

  fetchAbout(): Observable<SafeHtml> {
    return this.aboutCache
      ? of(this.aboutCache)
      : this.http.get('/post/about.html', { responseType: 'text' }).pipe(
          map(html => this.sanitized.bypassSecurityTrustHtml(html)),
          tap(html => (this.aboutCache = html)),
        );
  }

  fetchPosts(): Observable<PostGroup[]> {
    return this.groupCache
      ? of(this.groupCache)
      : this.http
          .get<PostGroup[]>('/posts.json')
          .pipe(tap(group => (this.groupCache = group)));
  }
}
