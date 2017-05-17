import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {LinkService} from './service/link';
import {Link} from '../../class/link';

@Component({
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  links: Link[];

  constructor (private linkService: LinkService,
               private titleService: Title) {
  }

  getLinks (): void {
    this.linkService.getLinks()
      .then(links => this.links = links);
  }

  ngOnInit () {
    this.getLinks();
    this.titleService.setTitle('Link - Solomon');
  }
}
