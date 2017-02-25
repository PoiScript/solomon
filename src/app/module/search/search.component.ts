import {Component, OnInit} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {Intro} from '../../class/post'
import {SearchResult} from '../../class/searchResult'
import {GitHubService} from '../../service/github/github.service'
import {PostService} from '../../service/post/post.service'

@Component({
  template: `
    <solomon-post-header></solomon-post-header>
    <div class="container">
      <md-card [fxLayout]="'row'" [fxLayoutAlign]="'end end'">
        <md-input-container [style.width]="'100%'">
          <input #input mdInput (keyup.enter)="keywordChanged(input.value)">
        </md-input-container>
        <button md-icon-button (click)="keywordChanged(input.value)">
          <md-icon>search</md-icon>
        </button>
      </md-card>
      <solomon-search-result *ngIf="result" [result]="result" [intros]="intros"></solomon-search-result>
    </div>
  `
})
export class SearchComponent implements OnInit {
  intros: Intro[]
  result: SearchResult
  title: string = 'Search'

  constructor(private githubService: GitHubService,
              private postService: PostService,
              private titleService: Title) {
  }

  keywordChanged(keyword: string) {
    this.title = `Search "${keyword}"`
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
    this.titleService.setTitle('Search - Solomon')
    this.getArchive()
  }
}
