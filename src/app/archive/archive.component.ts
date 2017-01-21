import {Component, OnInit} from "@angular/core"
import {Post} from "../classes/Post"
import {PostService} from "../service/post/post.service"
import {TitleService} from "../service/title/title.service"

@Component({
	template: `<post-list *ngFor="let year of years" [posts]="posts|yearPipe:year" [title]="year"></post-list>`,
})

export class ArchiveComponent implements OnInit {
	posts: Post[]
	years: Number[]

	constructor(private postService: PostService,
	            private titleService: TitleService) {
	}

	getArchive(): void {
		this.postService
			.getArchive()
			.then(posts => {
				this.posts = posts
				this.years = posts
					.map(post => new Date(post.date).getFullYear())
					.filter((year, index, self) => index === self.indexOf(year))
			})
	}

	ngOnInit(): void {
		this.getArchive()
		this.titleService.announceTitle("Archive")
	}
}