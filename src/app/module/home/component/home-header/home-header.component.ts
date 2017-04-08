import {Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {CONFIG_TOKEN} from '../../../../config';
import {SolomonConfig} from '../../../../interface/solomon-config';

@Component({
  selector: 'solomon-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  BLOG_NAME: string;
  BLOG_DESCRIPTION: string;

  constructor (private title: Title,
               @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.BLOG_NAME = config.BLOG_NAME;
    this.BLOG_DESCRIPTION = config.BLOG_DESCRIPTION;
  }

  ngOnInit (): void {
    this.title.setTitle(this.BLOG_NAME);
  }
}
