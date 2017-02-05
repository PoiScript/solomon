import {Component, OnInit} from "@angular/core"
import {Title} from "@angular/platform-browser"
import {GitHubService} from "../../service/github"
import {SearchResult} from "../../classes/SearchResult"

@Component({
	template: `
    <app-header [title]="title"></app-header>
    <search-bar (keywordChanged)="handleKeywordChanged($event)"></search-bar>
    <search-result *ngIf="result" [result]="result"></search-result>
	`
})
export class SearchComponent implements OnInit {
	result: SearchResult
	title: string = "Search"

	constructor(private githubService: GitHubService,
	            private titleService: Title) {
	}

	handleKeywordChanged(keyword: string) {
		this.title = `Search "${keyword}"`
		this.githubService
			.searchCode(keyword)
			.then(result => this.result = result)
	}

	ngOnInit() {
		this.titleService.setTitle(`Search - PoiScript's Blog`)
	}
}
