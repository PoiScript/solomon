import {Component, OnInit} from "@angular/core"
import {PostService} from "../../service/post"
import {Post} from "../../service/post/post"

@Component({
  selector: 'posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
	posts: Post[]

	constructor(private postService: PostService) {
	}

	getArchives():void {
		this.postService
			.getArchive()
			.then(posts => this.posts = posts)
	}

	ngOnInit() {
		this.getArchives()
	}
}