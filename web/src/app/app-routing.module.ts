import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import {
  AboutComponent,
  HomepageComponent,
  LinkComponent,
  NotFoundComponent,
  PostComponent,
} from './components';
import { Post, PostInfo } from './app.models';
import { PostService } from './post.service';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<Post> {
  constructor(private postService: PostService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    return this.postService.fetchPost(route.paramMap.get('slug'));
  }
}

@Injectable({ providedIn: 'root' })
export class AboutResolver implements Resolve<SafeHtml> {
  constructor(private postService: PostService) {}

  resolve(): Observable<SafeHtml> {
    return this.postService.fetchAbout();
  }
}

@Injectable({ providedIn: 'root' })
export class PostsResolver implements Resolve<PostInfo[]> {
  constructor(private postService: PostService) {}

  resolve(): Observable<PostInfo[]> {
    return this.postService.fetchPosts();
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
