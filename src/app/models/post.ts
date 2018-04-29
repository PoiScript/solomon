import { SafeHtml } from '@angular/platform-browser';

export class Post {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  next?: {
    title: string;
    slug: string;
  };
  prior?: {
    title: string;
    slug: string;
  };
}

export interface PostResolve {
  post: Post;
  html: SafeHtml;
}

export interface PostDict {
  [slug: string]: Post;
}
