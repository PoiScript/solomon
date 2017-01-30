import {Component, OnInit} from "@angular/core"
import {Post} from "../../classes/Post"
import {PostService} from "../../service/post"
import {Title} from "@angular/platform-browser"

@Component({
	template: `
    <app-header [title]="'Search'"></app-header>
    <search-bar (keywordChanged)="handleKeywordChanged($event)"></search-bar>
    <post-list [posts]="posts|keyword:keyword" [title]="'Title includes ' + keyword"></post-list>
	`
})
export class SearchComponent implements OnInit {
	posts: Post[]
	keyword: string = ""

	constructor(private archiveService: PostService,
	            private titleService: Title) {
	}

	handleKeywordChanged(keyword: string) {
		this.keyword = keyword
	}

	getArchive(): void {
		this.archiveService
			.getArchive()
			.then(posts => this.posts = posts)
	}

	ngOnInit() {
		this.getArchive()
		this.titleService.setTitle(`Search - PoiScript's Blog`)
	}
}
