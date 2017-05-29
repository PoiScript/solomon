import {Injectable} from '@angular/core';

import {POSTS} from './posts';

export interface PostItem {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  previous_title: string;
  previous_slug: string;
  next_title: string;
  next_slug: string;
  html: string;
}

@Injectable()
export class PostItems {

  getAllItems (): PostItem[] {
    return POSTS;
  }

  getItemBySlug (slug: string): PostItem {
    return POSTS.find(i => i.slug === slug);
  }
}
