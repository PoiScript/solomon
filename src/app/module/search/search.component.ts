import {Component, Inject, OnInit} from '@angular/core'
import {Title} from '@angular/platform-browser'

import {Intro} from '../../class/post'
import {SearchResult} from '../../class/searchResult'
import {GitHubService} from '../../service/github'
import {PostService} from '../../service/post'
import {SolomonConfig} from '../../interface/solomon-config'
import {CONFIG_TOKEN} from '../../config'
import {HeaderService} from '../../service/header/header.service'

@Component({
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  intros: Intro[]
  result: SearchResult
  private BLOG_NAME: string

  constructor(private githubService: GitHubService,
              private postService: PostService,
              private titleService: Title,
              private headerService: HeaderService,
              @Inject(CONFIG_TOKEN) config: SolomonConfig,) {
    this.BLOG_NAME = config.BLOG_NAME
  }

  keywordChanged(keyword: string) {
    this.githubService
      .searchCode(keyword)
      .then(result => this.result = result)
  }

  getArchive(): void {
    this.postService
      .getArchive()
      .then(intros => this.intros = intros)
  }

  ngOnInit() {
    this.headerService.changeHomeHeader('Search')
    this.titleService.setTitle(`Search - ${this.BLOG_NAME}`)
    this.getArchive()
  }
}
