import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Post, PostGroup } from '../model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private aboutCache: Post | null = null;
  private groupCache: PostGroup[] | null = null;

  constructor(private http: HttpClient) {}

  fetchPost(slug: string): Observable<Post> {
    return this.http.get<Post>(`/post/${slug}.json`);
  }

  fetchAbout(): Observable<Post> {
    return this.aboutCache
      ? of(this.aboutCache)
      : this.http
          .get<Post>('/post/about.json')
          .pipe(tap(post => (this.aboutCache = post)));
  }

  fetchPosts(): Observable<PostGroup[]> {
    return this.groupCache
      ? of(this.groupCache)
      : this.http
          .get<PostGroup[]>('/posts.json')
          .pipe(tap(group => (this.groupCache = group)));
  }
}
