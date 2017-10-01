import { Component, Inject } from '@angular/core';

import { AppConfig, APP_CONFIG } from 'app/app.config';
import { Link } from 'app/shared';

@Component({
  selector: 'solomon-link',
  templateUrl: './link.component.html'
})
export class LinkComponent {
  links: Link[];

  constructor (@Inject(APP_CONFIG) config: AppConfig) {
    this.links = config.links;
  }
}
