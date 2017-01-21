import {Component, OnInit} from "@angular/core"
import {PostService} from "../../service/post"
import {Post} from "../../classes/Post"

@Component({
	selector: 'posts',
	template: `<post-list [posts]="posts" [limit]="6" [title]="'Recent Posts'"></post-list>`,

})

export class PostsComponent implements OnInit {
	posts: Post[]

	constructor(private postService: PostService) {
	}

	getArchives(): void {
		this.postService
			.getArchive()
			.then(posts => this.posts = posts)
	}

	ngOnInit() {
		this.getArchives()
	}
}