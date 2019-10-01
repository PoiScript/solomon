import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, EMPTY, BehaviorSubject } from 'rxjs';
import { catchError, publishReplay, refCount, finalize } from 'rxjs/operators';

import { Post } from './app.models';

@Injectable({ providedIn: 'root' })
export class AppService {
  private isLoadingSource = new BehaviorSubject(false);

  isLoading$ = this.isLoadingSource.asObservable();

  private posts: Observable<Post[]> = this.http.get<Post[]>('/posts.json').pipe(
    publishReplay(1),
    refCount(),
  );

  constructor(private http: HttpClient, private router: Router) {}

  getPost(slug: string): Observable<Post> {
    this.isLoadingSource.next(true);
    return this.http.get<Post>(`/post/${slug}.json`).pipe(
      catchError(err => {
        console.error(err);
        this.router.navigate(['/not-found']);
        return EMPTY;
      }),
      finalize(() => this.isLoadingSource.next(false)),
    );
  }

  getPosts(): Observable<Post[]> {
    this.isLoadingSource.next(true);
    return this.posts.pipe(finalize(() => this.isLoadingSource.next(false)));
  }
}
