import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppConfig, APP_CONFIG } from 'app/app.config';
import { Post } from 'app/shared';

@Component({
  selector: 'solomon-tag',
  templateUrl: './tag.component.html'
})
export class TagComponent implements OnInit {
  tag: string;
  posts: Post[];

  constructor (@Inject(APP_CONFIG) config: AppConfig,
               private route: ActivatedRoute) {
    this.posts = config.posts;
  }

  ngOnInit () {
    this.route.params.subscribe((params: Params) => {
      this.tag = params['tag'];
    });
  }
}
