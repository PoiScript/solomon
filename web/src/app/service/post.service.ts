import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Post } from '../model';

@Injectable({ providedIn: 'root' })
export class PostService {
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public posts$ = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) {
    this.fetchPostDict();
  }

  fetchPost(slug: string): Observable<Post> {
    this.isLoading$.next(true);
    return this.http
      .get<Post>(`/json/${slug}.json`)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }

  fetchPostDict() {
    this.http
      .get<Post[]>('/posts.json')
      .subscribe(posts => this.posts$.next(posts));
  }
}
