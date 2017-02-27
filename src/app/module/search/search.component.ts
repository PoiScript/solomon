import {Component, Inject, OnDestroy, OnInit} from '@angular/core'
import {Title} from '@angular/platform-browser'

import {Intro} from '../../class/post'
import {SearchResult} from '../../class/searchResult'
import {GitHubService} from '../../service/github'
import {SolomonConfig} from '../../interface/solomon-config'
import {CONFIG_TOKEN} from '../../config'
import {HeaderService} from '../../service/header'
import {Subscription} from 'rxjs'
import {ActivatedRoute, Params} from '@angular/router'
import {PostService} from '../../service/post/post.service'

@Component({
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  intros: Intro[]
  result: SearchResult
  query: string
  private BLOG_NAME: string
  private sub: Subscription

  constructor(private githubService: GitHubService,
              private titleService: Title,
              private route: ActivatedRoute,
              private postService: PostService,
              private headerService: HeaderService,
              @Inject(CONFIG_TOKEN) config: SolomonConfig,) {
    this.BLOG_NAME = config.BLOG_NAME
    this.sub = this.route.params.subscribe((params: Params) => {
      this.query = params['q']
      this.githubService
        .searchCode(params['q'])
        .then(result => this.result = result)
    })
  }

  getArchive(): void {
    this.postService
      .getArchive()
      .then(intros => this.intros = intros)
  }

  ngOnInit(): void {
    this.getArchive()
    this.headerService.changeHomeHeader('Search')
    this.titleService.setTitle(`Search - ${this.BLOG_NAME}`)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
