import {Component, OnInit} from "@angular/core"
import {PostService} from "../../service/post"

@Component({
  selector: 'posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
	title: string
	html: string
	category: string
	date: Date

	constructor(private _postService: PostService) {
	}

	ngOnInit() {
		this._postService.getPostByPath()
			.subscribe(
				data => {
					this.title = data.title
					this.html = data.html
					this.category = data.category
					this.date = new Date(data.date)
				},
				err => alert(err),
				() => console.log("Posts get")
			)
	}
}