import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of as observableOf } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Post, PostInfo } from './app.models';

@Injectable({ providedIn: 'root' })
export class PostService {
  private postsCache: PostInfo[] | null = null;

  constructor(private http: HttpClient) {}

  fetchPost(slug: string): Observable<Post> {
    return this.http.get<Post>(`/post/${slug}.json`);
  }

  fetchAbout(): Observable<Post> {
    return this.http.get<Post>('/post/about.json');
  }

  fetchPosts(): Observable<PostInfo[]> {
    return this.postsCache
      ? observableOf(this.postsCache)
      : this.http
          .get<Post[]>('/posts.json')
          .pipe(tap(group => (this.postsCache = group)));
  }
}
