import { InjectionToken } from '@angular/core';

import { Post } from './post.model';

export interface PostConfig {
  posts: Post[];
}

export const POST_CONFIG = new InjectionToken<PostConfig>('post.config');
