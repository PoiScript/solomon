import {Component, OnInit} from "@angular/core"
import {ActivatedRoute} from "@angular/router"

import {PostService} from "../service/post/post.service"
import {Post} from "../service/post/post"

@Component({
	templateUrl: './post.component.html'
})

export class PostComponent implements OnInit {
	post: Post

	constructor(private postService: PostService, private router: ActivatedRoute) {
	}

	getPost(slug: string): void {
		this.postService
			.getPost(slug)
			.then(post => this.post = post)
	}

	ngOnInit(): void {
		this.router.params
			.subscribe(params => this.getPost(params['slug']))
	}
}