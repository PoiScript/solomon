import { Injectable } from '@angular/core';
import { Post } from 'app/app.types';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { posts } from '../../../../assets/post';

@Injectable()
export class PostService {
  private posts: Post[] = posts;

  getPostBySlug (slug: string): [Post, Post, Post] {
    const i = this.posts.findIndex(post => post.slug === slug);
    return [this.posts[i], this.posts[i - 1], this.posts[i + 1]];
  }

  getAllPosts (): Post[] {
    return this.posts;
  }

  getPostsByTag (tag: string): Post[] {
    return this.posts.filter(post => post.tags.includes(tag));
  }
}
