import { InjectionToken, ValueProvider } from '@angular/core';

import { posts } from 'config';
import { PostDict } from './models';

export const POST_CONFIG = new InjectionToken<PostDict>('post.config');

export const PostProvider: ValueProvider = {
  provide: POST_CONFIG,
  useValue: posts,
};
