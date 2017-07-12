import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Post} from 'app/app.types';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  private posts: Post[];

  constructor (private http: Http) { }

  load (): Promise<Post[]> {
    const promise = this.http.get('/post.json').map(res => res.json()).toPromise();
    promise.then(posts => this.posts = posts);
    return promise;
  }

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
