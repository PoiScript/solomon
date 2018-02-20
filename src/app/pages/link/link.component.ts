import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Link, LinkConfig, LINK_CONFIG } from 'app/shared';

@Component({
  selector: 'solomon-link',
  templateUrl: './link.component.html',
})
export class LinkComponent {

  links: Link[];

  constructor (@Inject(LINK_CONFIG) config: LinkConfig,
               private titleService: Title) {
    this.links = config.links;
    this.titleService.setTitle('link | solomon');
  }

}
