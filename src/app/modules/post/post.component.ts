import {Component, OnInit} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {PostService} from "../../service/post"
import {Post} from "../../classes/Post"
import {Title} from "@angular/platform-browser"
import {Comment} from "../../classes/Comment"
import {GitHubService} from "../../service/github/github.service"
import {Location} from "@angular/common"

@Component({
	template: `
    <div class="parallax" [ngStyle]="{'background-image': 'url(' + post?.intro.image +')'}"></div>
    <button md-fab (click)="backClicked()" [color]="'primary'">
      <md-icon>keyboard_backspace</md-icon>
    </button>
    <post-content [post]="post"></post-content>
    <comment [comments]="comments" [issue_number]="post?.intro.issue_number"></comment>
	`,
	styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
	post: Post
	comments: Comment[]

	constructor(private postService: PostService,
	            private location: Location,
	            private titleService: Title,
	            private githubService: GitHubService,
	            private router: ActivatedRoute) {
	}

	backClicked(): void {
		this.location.back()
	}

	getPost(slug: string): void {
		this.postService
			.getPost(slug)
			.then(post => {
				this.post = post
				this.titleService.setTitle(`${post.intro.title} - Solomon`)
				return post.intro.issue_number
			})
			.then(number => this.githubService.getIssueComments(number).then(comments => this.comments = comments))
	}

	ngOnInit(): void {
		this.router.params
			.subscribe(params => this.getPost(params['slug']))
	}
}