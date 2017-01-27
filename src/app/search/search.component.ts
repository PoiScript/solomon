import {Component, OnInit} from "@angular/core"
import {CategoryService} from "../service/category"
import {Category} from "../classes/Category"
import {Post} from "../classes/Post"
import {PostService} from "../service/post/post.service"

@Component({
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	categories: Category[]
	posts: Post[]
	keyword: string = ""
	includeCategory: boolean = true
	includePostTitle: boolean = true

	constructor(private archiveService: PostService,
	            private categoryService: CategoryService) {
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
