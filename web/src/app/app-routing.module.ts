import { NgModule, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError, publishReplay, refCount } from 'rxjs/operators';

import {
  AboutComponent,
  HomepageComponent,
  LinkComponent,
  NotFoundComponent,
  PostComponent,
} from './components';
import { Post } from './app.models';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<Post> {
  constructor(private http: HttpClient, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    const slug = route.paramMap.get('slug');
    return this.http.get<Post>(`/post/${slug}.json`).pipe(
      catchError(err => {
        console.error(err);
        this.router.navigate(['/not-found']);
        return EMPTY;
      }),
    );
  }
}

@Injectable({ providedIn: 'root' })
export class AboutResolver implements Resolve<Post> {
  constructor(private http: HttpClient) {}

  resolve(): Observable<Post> {
    return this.http.get<Post>('/post/about.json');
  }
}

@Injectable({ providedIn: 'root' })
export class PostsResolver implements Resolve<Post[]> {
  constructor(private http: HttpClient) {}

  private posts: Observable<Post[]> = this.http.get<Post[]>('/posts.json').pipe(
    publishReplay(1),
    refCount(),
  );

  resolve(): Observable<Post[]> {
    return this.posts;
  }
}

export const ROUTES: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
    resolve: { posts: PostsResolver },
  },
  {
    path: 'about',
    component: AboutComponent,
    resolve: { post: AboutResolver },
  },
  {
    path: 'post/:slug',
    component: PostComponent,
    resolve: { post: PostResolver },
  },
  { path: 'link', component: LinkComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
