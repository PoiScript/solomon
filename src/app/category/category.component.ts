import {Component, OnInit} from "@angular/core"
import {PostService} from "../service/post/post.service"
import {Post} from "../service/post/post"
import {ActivatedRoute} from "@angular/router"

@Component({
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css'],
	providers: [PostService]
})
export class CategoryComponent implements OnInit {
	posts: Post[]
	category: string

	constructor(private postService: PostService, private route: ActivatedRoute) {
	}

	getPosts(): void {
		this.postService
			.getCategories()
			.then(categories => this.posts = categories.filter((category) => category.title === this.category)[0].posts)
	}

	ngOnInit() {
		this.route.params.subscribe(
			params => {
				this.category = params['title']
				this.getPosts()
			}
		)
	}
}
