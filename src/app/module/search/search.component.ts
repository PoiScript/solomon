import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {Intro} from '../../class/post';
import {SearchResult} from '../../class/searchResult';
import {GitHubService} from '../../service/github';
import {PostService} from '../../service/post';

@Component({
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  intros: Intro[];
  result: SearchResult;
  query: string;
  private sub: Subscription;

  constructor(private githubService: GitHubService,
              private titleService: Title,
              private route: ActivatedRoute,
              private postService: PostService) {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.query = params['q'];
      this.githubService
        .searchCode(params['q'])
        .then(result => this.result = result);
    });
  }

  getArchive(): void {
    this.postService
      .getArchive()
      .then(intros => this.intros = intros);
  }

  ngOnInit(): void {
    this.getArchive();
    this.titleService.setTitle('Search - Solomon');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
