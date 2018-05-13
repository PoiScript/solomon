import { InjectionToken, ValueProvider } from '@angular/core';

import { PostDict } from '@solomon/models';

import { posts } from '../config';

export const POST_CONFIG = new InjectionToken<PostDict>('post.config');

export const PostProvider: ValueProvider = {
  provide: POST_CONFIG,
  useValue: posts,
};
