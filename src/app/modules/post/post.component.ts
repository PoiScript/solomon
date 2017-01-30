import {Component, OnInit} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {PostService} from "../../service/post"
import {Post} from "../../classes/Post"
import {Title} from "@angular/platform-browser"

@Component({
	template: `
    <app-header [title]="post?.title" [isPostPage]="true"></app-header>
    <article>
      <post-content [post]="post"></post-content>
      <app-footer [nextPostTile]="post?.slug" [previousPostTitle]="post?.slug"></app-footer>
    </article>
    <comment></comment>
	`,
	styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
	post: Post

	constructor(private postService: PostService,
	            private titleService: Title,
	            private router: ActivatedRoute) {
	}

	getPost(slug: string): void {
		this.postService
			.getPost(slug)
			.then(post => {
				this.post = post
				this.titleService.setTitle(`${post.title} - PoiScript's Blog`)
			})
	}

	ngOnInit(): void {
		this.router.params
			.subscribe(params => this.getPost(params['slug']))
	}
}