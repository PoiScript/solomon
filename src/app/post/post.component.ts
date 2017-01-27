import {Component, OnInit} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {PostService} from "../service/post/post.service"
import {Post} from "../classes/Post"
import {SideNavService} from "../service/sidenav/sidenav.service"

@Component({
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
	post: Post
	viewSource: boolean = false

	constructor(private postService: PostService,
	            private sideNavService: SideNavService,
	            private router: ActivatedRoute) {
	}

	getPost(slug: string): void {
		this.postService
			.getPost(slug)
			.then(post => this.post = post)
	}

	ngOnInit(): void {
		this.router.params
			.subscribe(params => this.getPost(params['slug']))
		this.sideNavService.closeSideNav()
	}
}