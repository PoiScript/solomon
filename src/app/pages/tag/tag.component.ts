import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Post, PostConfig, POST_CONFIG } from 'app/shared';

@Component({
  selector: 'solomon-tag',
  templateUrl: './tag.component.html',
})
export class TagComponent implements OnInit {

  tag: string;
  posts: Post[];

  constructor (@Inject(POST_CONFIG) config: PostConfig,
               private route: ActivatedRoute,
               private titleService: Title) {
    this.posts = config.posts;
  }

  ngOnInit () {
    this.route.params.subscribe(params => {
      this.tag = params['tag'];
      this.titleService.setTitle(`#${this.tag} | solomon`);
    });
  }

}
