import {Component, OnInit} from "@angular/core"
import {Post} from "../service/post/post"
import {PostService} from "../service/post/post.service"

@Component({
	templateUrl: './archive.component.html'
})

export class ArchiveComponent implements OnInit {
	posts: Post[]
	yearArray: Number[]

	constructor(private postService: PostService) {
	}

	getArchive(): void {
		this.postService
			.getArchive()
			.then(posts => {
				this.posts = posts
				this.yearArray = this.getYearArray(this.posts)
			})
	}

	getYearArray(posts: Post[]): Number[] {
		let years: Number[] = []
		posts.forEach((post) => {
			let year = new Date(post.date).getFullYear()
			if (years.indexOf(year) == -1)
				years.push(year)
		})
		return years
	}

	ngOnInit(): void {
		this.getArchive()
	}
}