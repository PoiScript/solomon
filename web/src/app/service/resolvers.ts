import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Post, PostGroup } from '../model';
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
export class PostGroupResolver implements Resolve<PostGroup[]> {
  constructor(private postService: PostService) {}

  resolve(): Observable<PostGroup[]> {
    return this.postService.fetchPosts();
  }
}
