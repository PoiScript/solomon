import {Component, OnInit} from "@angular/core"
import {TitleService} from "../service/title"
import {CategoryService} from "../service/category"
import {Category} from "../service/post/category"
import {Post} from "../service/post/post"
import {PostService} from "../service/post/post.service"

@Component({
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	categories: Category[]
	posts: Post[]
	keyword: string = ""

	constructor(private titleService: TitleService,
	            private archiveService: PostService,
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
		this.titleService.announceTitle('Search')
		this.getCategories()
		this.getArchive()
	}
}
