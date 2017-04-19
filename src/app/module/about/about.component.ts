import {Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Post} from '../../class/post';
import {PostService} from '../../service/post';
import {CONFIG_TOKEN} from '../../../config';
import {SolomonConfig} from '../../interface/solomon-config';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  post: Post;
  private BLOG_NAME: string;

  constructor(private titleService: Title,
              private postService: PostService,
              @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.BLOG_NAME = config.BLOG_NAME;
  }

  getAbout(): void {
    this.postService
      .getPost('about')
      .then(post => this.post = post);
  }

  ngOnInit(): void {
    this.titleService.setTitle(`About - ${this.BLOG_NAME}`);
    this.getAbout();
  }
}
