import {Component, OnInit} from "@angular/core"
import {Title} from "@angular/platform-browser"
import {GitHubService} from "../../service/github"
import {SearchResult} from "../../classes/SearchResult"

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
      <search-result *ngIf="result" [result]="result"></search-result>
    </div>
	`,
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	result: SearchResult
	title: string = "Search"

	constructor(private githubService: GitHubService,
	            private titleService: Title) {
	}

	keywordChanged(keyword: string) {
		this.title = `Search "${keyword}"`
		this.githubService
			.searchCode(keyword)
			.then(result => this.result = result)
	}

	ngOnInit() {
		this.titleService.setTitle('Search - Solomon')
	}
}
