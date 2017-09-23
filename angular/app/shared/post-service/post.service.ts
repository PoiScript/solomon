import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Post } from 'app/shared/post.model';
import { posts } from '../../../../solomon.conf.js';

@Injectable()
export class PostService {
  private posts: Post[] = posts;

  getPostBySlug (slug: string): [Post, Post, Post] {
    const i = this.posts.findIndex(post => post.slug === slug);
    return [this.posts[i], this.posts[i - 1], this.posts[i + 1]];
  }
}
