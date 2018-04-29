import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { PostDict } from 'app/models';
import { POST_CONFIG } from 'app/post.config';

@Component({ templateUrl: './tag.component.html' })
export class TagComponent {
  posts = this.postConfig;

  get tag() {
    return this.route.snapshot.params['tag'];
  }

  constructor(
    @Inject(POST_CONFIG) private postConfig: PostDict,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
    this.route.params.subscribe(params => {
      this.titleService.setTitle(`#${params['tag']} | solomon`);
    });
  }
}
