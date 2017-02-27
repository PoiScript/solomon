import {Component, Inject, OnInit} from '@angular/core'
import {Title} from '@angular/platform-browser'

import {PostService} from '../../service/post'
import {Intro} from '../../class/post'
import {SolomonConfig} from '../../interface/solomon-config'
import {CONFIG_TOKEN} from '../../config'
import {HeaderService} from '../../service/header/header.service'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  intros: Intro[]
  BLOG_NAME: string
  BLOG_DESCRIPTION: string

  constructor(private postService: PostService,
              private title: Title,
              private headerService: HeaderService,
              @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.BLOG_NAME = config.BLOG_NAME
    this.BLOG_DESCRIPTION = config.BLOG_DESCRIPTION
  }

  getRecent(): void {
    this.postService
      .getRecent()
      .then(intros => this.intros = intros)
  }

  ngOnInit(): void {
    this.headerService.changeHomeHeader(this.BLOG_NAME)
    this.title.setTitle(this.BLOG_NAME)
    this.getRecent()
  }
}
