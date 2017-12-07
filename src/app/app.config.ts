import { InjectionToken } from '@angular/core';

import { Post, Link } from 'app/shared';

export interface AppConfig {
  posts: Post[];
  links: Link[];
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
