import { InjectionToken } from '@angular/core';

import { Link } from './link.model';

export interface LinkConfig {
  links: Link[];
}

export const LINK_CONFIG = new InjectionToken<LinkConfig>('link.config');
