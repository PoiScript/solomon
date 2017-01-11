import {Component, OnInit} from "@angular/core"
import {PostService} from "../service/post/post.service"
import {Post} from "../service/post/post"
import {ActivatedRoute} from "@angular/router"

@Component({
	selector: 'home',
	templateUrl: './post.component.html'
})

export class PostComponent implements OnInit {
	post: Post
	path: string
	html: string

	constructor(private postService: PostService, private router: ActivatedRoute) {
	}

	getPost(): void {
		this.postService
			.getPost(this.path)
			.then(post => {
				this.post = post
				this.html = post.html
			})
	}

	ngOnInit(): void {
		this.router.params.subscribe(
			params => {
				this.path = params['path']
				this.getPost()
			}
		)
	}
}