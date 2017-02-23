import {Component, OnInit} from "@angular/core"
import {Title} from "@angular/platform-browser"
import {Intro} from "../../../share/classes/Post"
import {PostService} from "../../../share/service/post"

@Component({
	template: `
    <app-header i18n-title title="Archive"></app-header>
    <post-list *ngFor="let year of years" [intros]="intros|yearPipe:year" [title]="year"></post-list>
	`,
})

export class ArchiveComponent implements OnInit {
	intros: Intro[]
	years: Number[]

	constructor(private postService: PostService,
	            private titleService: Title) {
	}

	getArchive(): void {
		this.postService
			.getArchive()
			.then(intros => {
				this.intros = intros
				this.years = intros
					.map(intro => new Date(intro.date).getFullYear())
					.filter((year, index, self) => index === self.indexOf(year))
			})
	}

	ngOnInit(): void {
		this.getArchive()
		this.titleService.setTitle('Archive - Solomon')
	}
}
