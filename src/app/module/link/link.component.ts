import {Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {LinkService} from './service/link';
import {Link} from '../../class/link';
import {SolomonConfig} from '../../interface/solomon-config';
import {CONFIG_TOKEN} from '../../../config';

@Component({
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  links: Link[];
  private BLOG_NAME: string;

  constructor(private linkService: LinkService,
              private titleService: Title,
              @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.BLOG_NAME = config.BLOG_NAME;
  }

  getLinks(): void {
    this.linkService.getLinks()
      .then(links => this.links = links);
  }

  ngOnInit() {
    this.getLinks();
    this.titleService.setTitle(`Link - ${this.BLOG_NAME}`);
  }
}
