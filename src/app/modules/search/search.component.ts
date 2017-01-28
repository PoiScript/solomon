import {Component, OnInit} from "@angular/core"
import {Category} from "../../classes/Category"
import {Post} from "../../classes/Post"
import {PostService} from "../../service/post"
import {CategoryService} from "../../service/category"

@Component({
	template: `
    <app-header [title]="'Search'"></app-header>
    <search-bar (keywordChanged)="handleKeywordChanged($event)"></search-bar>
    <post-list
        [posts]="posts|keyword:keyword"
        [title]="'Title includes ' + keyword"></post-list>
	`
})
export class SearchComponent implements OnInit {
	categories: Category[]
	posts: Post[]
	keyword: string = ""

	constructor(private archiveService: PostService,
	            private categoryService: CategoryService) {
	}

	handleKeywordChanged(keyword: string) {
		this.keyword = keyword
	}

	getCategories(): void {
		this.categoryService
			.getCategories()
			.then(categories => this.categories = categories)
	}

	getArchive(): void {
		this.archiveService
			.getArchive()
			.then(posts => this.posts = posts)
	}

	ngOnInit() {
		this.getCategories()
		this.getArchive()
	}
}
