import {Component, OnInit} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {PostService} from "../service/post/post.service"
import {Post} from "../classes/Post"
import {TitleService} from "../service/title/title.service"

@Component({
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
	post: Post
	viewSource: boolean = false

	constructor(private postService: PostService,
	            private titleService: TitleService,
	            private router: ActivatedRoute) {
	}

	getPost(slug: string): void {
		this.postService
			.getPost(slug)
			.then(post => {
				this.post = post
				this.titleService.announceTitle(post.title)
			})
	}

	ngOnInit(): void {
		this.router.params
			.subscribe(params => this.getPost(params['slug']))
	}
}