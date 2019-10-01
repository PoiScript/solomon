import { NgModule, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterModule,
  Routes,
} from '@angular/router';
import { Observable } from 'rxjs';

import {
  AboutComponent,
  HomepageComponent,
  LinkComponent,
  NotFoundComponent,
  PostComponent,
} from './components';
import { Post } from './app.models';
import { AppService } from './app.service';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<Post> {
  constructor(private appService: AppService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    return this.appService.getPost(route.paramMap.get('slug'));
  }
}

@Injectable({ providedIn: 'root' })
export class AboutResolver implements Resolve<Post> {
  constructor(private appService: AppService) {}

  resolve(): Observable<Post> {
    return this.appService.getPost('about');
  }
}

@Injectable({ providedIn: 'root' })
export class PostsResolver implements Resolve<Post[]> {
  constructor(private appService: AppService) {}

  resolve(): Observable<Post[]> {
    return this.appService.getPosts();
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
