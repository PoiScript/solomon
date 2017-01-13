import {Component, OnDestroy, OnInit} from "@angular/core"
import {Category} from "../service/post/category"
import {CategoryService} from "../service/category"
import {ActivatedRoute} from "@angular/router"
import {TitleService} from "../service/title/title.service"
import {Post} from "../service/post/post"

@Component({
	template: `<post-list *ngFor="let year of yearArray" [posts]="category?.posts|yearPipe:year" [title]="year"></post-list>`,
})
export class CategoryComponent implements OnDestroy, OnInit{
	// subscription: Subscription
	category: Category
	yearArray: Number[]

	constructor(
		private categoryService: CategoryService,
		private titleService: TitleService,
		private router: ActivatedRoute
	){
		// this.subscription = categoryService.categoryAnnounced$
		// 	.subscribe(
		// 		category => {
		// 			this.category = category
		// 			console.error(category)
		// 		}
		// )
	}

	getCategory(title: string): void {
		this.categoryService
			.getCategories()
			.then((categories) => {
				this.category = categories.filter((cat) => cat.title === title)[0]
				this.titleService.announceTitle(this.category.title)
				this.yearArray = this.divideByYear(this.category.posts)
			})
	}

	divideByYear(posts: Post[]): Number[] {
		let years: Number[] = []
		posts.forEach((post) => {
			let year = new Date(post.date).getFullYear()
			if (years.indexOf(year) == -1)
				years.push(year)
		})
		return years
	}

	ngOnInit(): void {
			this.router.params.subscribe(
				params => {
					this.getCategory(params['title'])
				}
			)
	}

	ngOnDestroy(): void {
		// this.subscription.unsubscribe()
	}
}
