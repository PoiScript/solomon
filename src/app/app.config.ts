import {InjectionToken} from '@angular/core';

export interface Link {
  github_username: string;
  nickname: string;
  text: string;
  address: string;
  bio: string;
}

export interface SolomonLink {
  count: number;
  item: Link[];
}

export interface Post {
  title: string;
  slug: string;
  date: string;
  sub_header: string;
  tags: string[];
  previous_title: string;
  previous_slug: string;
  next_title: string;
  next_slug: string;
  html: string;
}

export interface SolomonPost {
  count: number;
  item: Post[];
}

export const SOLOMON_LINK = new InjectionToken<SolomonLink>('solomon.link');
export const SOLOMON_POST = new InjectionToken<SolomonPost>('solomon.post');
