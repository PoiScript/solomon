import {Component, OnInit} from "@angular/core"
import {Title} from "@angular/platform-browser"
import {GitHubService} from "../../service/github"
import {SearchResult} from "../../classes/SearchResult"
import {Intro} from "../../classes/Post"
import {PostService} from "../../service/post/post.service"

@Component({
  template: `
    <app-header [title]="title"></app-header>
    <div class="container">
      <div [fxLayout]="'row'" [fxLayoutAlign]="'end end'">
        <md-input-container [style.width]="'100%'">
          <input #input md-input (keyup.enter)="keywordChanged(input.value)">
        </md-input-container>
        <button md-icon-button (click)="keywordChanged(input.value)">
          <md-icon>search</md-icon>
        </button>
      </div>
      <search-result *ngIf="result" [result]="result" [intros]="intros"></search-result>
    </div>
  `
})
export class SearchComponent implements OnInit {
  intros: Intro[]
  result: SearchResult
  title: string = "Search"

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
