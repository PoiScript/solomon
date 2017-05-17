import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Post} from '../../class/post';
import {CONFIG_TOKEN} from '../../../config';
import {PostService} from '../../service/post';
import {SolomonConfig} from '../../interface/solomon-config';
import {GitHubService} from '../../service/github';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit {
  private GITHUB_USERNAME: string;
  private GITHUB_POST_REPO: string;
  private BLOG_NAME: string;
  post: Post;

  constructor (@Inject(CONFIG_TOKEN) config: SolomonConfig,
               private postService: PostService,
               private titleService: Title,
               private router: ActivatedRoute) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME;
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO;
    this.BLOG_NAME = config.BLOG_NAME;
  }

  getPost (slug: string): void {
    this.postService
      .getPost(slug)
      .then(post => {
        this.post = post;
        this.titleService.setTitle(`${post.intro.title} - ${this.BLOG_NAME}`);
      });
  }

  ngOnInit (): void {
    this.router.params.subscribe(params => this.getPost(params['slug']));
  }
}
