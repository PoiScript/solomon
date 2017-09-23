import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Post } from 'app/shared/post.model';
import { posts } from '../../../solomon.conf.js';

@Component({
  selector: 'solomon-tag',
  templateUrl: './tag.component.html'
})
export class TagComponent implements OnInit {
  tag: string;
  posts: Post[] = posts;

  constructor (private route: ActivatedRoute) { }

  ngOnInit () {
    this.route.params.subscribe((params: Params) => {
      this.tag = params['tag'];
    });
  }
}
