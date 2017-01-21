import {Component, OnInit} from "@angular/core"
import {Category} from "../classes/Category"
import {CategoryService} from "../service/category"
import {ActivatedRoute} from "@angular/router"
import {TitleService} from "../service/title/title.service"

@Component({
	template: `<post-list *ngFor="let year of years" [posts]="category?.posts|yearPipe:year" [title]="year"></post-list>`,
})
export class CategoryComponent implements OnInit {
	category: Category
	years: Number[]

	constructor(private categoryService: CategoryService,
	            private titleService: TitleService,
	            private router: ActivatedRoute) {
	}

	getCategory(title: string): void {
		this.categoryService
			.getCategories()
			.then((categories) => {
				this.category = categories.find(category => category.title === title)
				this.titleService.announceTitle(this.category.title)
				this.years = this.category.posts
					.map(post => new Date(post.date).getFullYear())
					.filter((year, index, self) => index === self.indexOf(year))
			})
	}

	ngOnInit(): void {
		this.router.params.subscribe(
			params => this.getCategory(params['title'])
		)
	}
}
