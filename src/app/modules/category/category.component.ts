import {Component, OnInit} from "@angular/core"
import {Category} from "../../classes/Category"
import {ActivatedRoute} from "@angular/router"
import {CategoryService} from "../../service/category"
import {Title} from "@angular/platform-browser"

@Component({
	template: `
    <app-header [title]="category?.title"></app-header>
    <post-list *ngFor="let year of years" [posts]="category?.posts|yearPipe:year" [title]="year"></post-list>
	`,
})
export class CategoryComponent implements OnInit {
	category: Category
	years: Number[]

	constructor(private categoryService: CategoryService,
	            private router: ActivatedRoute,
	            private titleService: Title) {
	}

	getCategory(title: string): void {
		this.categoryService
			.getCategories()
			.then((categories) => {
				this.category = categories.find(category => category.title === title)
				this.years = this.category.posts
					.map(post => new Date(post.date).getFullYear())
					.filter((year, index, self) => index === self.indexOf(year))
			})
	}

	ngOnInit(): void {
		this.router.params.subscribe(
			params => {
				this.getCategory(params['title'])
				this.titleService.setTitle(`${params['title']} - PoiScript's Blog`)
			}
		)
	}
}
