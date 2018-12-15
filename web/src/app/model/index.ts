import { SafeHtml } from '@angular/platform-browser';

export class Post {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  html: SafeHtml;
  next?: {
    title: string;
    slug: string;
  };
  prior?: {
    title: string;
    slug: string;
  };
}

export interface Link {
  address: string;
  avatar: string;
  name: string;
}
