import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {PostService} from '../../service/post';
import {Intro} from '../../class/post';
import {SolomonConfig} from '../../interface/solomon-config';
import {CONFIG_TOKEN} from '../../config';

@Component({
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  private BLOG_NAME: string;
  intros: Intro[];
  tag: string;

  constructor(private postService: PostService,
              private titleService: Title,
              private router: ActivatedRoute,
              @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.BLOG_NAME = config.BLOG_NAME;
  }

  getArchive(): void {
    this.postService
      .getArchive()
      .then(intros => this.intros = intros);
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Tag - ${this.BLOG_NAME}`);
    this.getArchive();
    this.router.params
      .subscribe(params => this.tag = params['tag']);
  }

}
