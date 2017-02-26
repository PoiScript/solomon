import {Component, Inject, OnInit} from '@angular/core'

import {PostService} from '../../service/post'
import {Intro} from '../../class/post'
import {SolomonConfig} from '../../interface/solomon-config'
import {CONFIG_TOKEN} from '../../config'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  intros: Intro[]
  BLOG_NAME: string
  BLOG_DESCRIPTION: string

  constructor(private postService: PostService,
              @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.BLOG_NAME = config.BLOG_NAME
    this.BLOG_DESCRIPTION = config.BLOG_DESCRIPTION
  }

  getArchive(): void {
    this.postService
      .getArchive()
      .then(intros => this.intros = intros)
  }

  ngOnInit(): void {
    this.getArchive()
  }
}
