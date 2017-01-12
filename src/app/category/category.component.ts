import {Component, OnDestroy, OnInit} from "@angular/core"
import {PostService} from "../service/post"
import {Category} from "../service/post/category"
import {CategoryService} from "../service/category"
import {ActivatedRoute} from "@angular/router"

@Component({
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css'],
	providers: [PostService]
})
export class CategoryComponent implements OnDestroy, OnInit{
	// subscription: Subscription
	category: Category

	getCategory(title: string): void{
		this.categoryService
			.getCategories()
			.then((categories) => this.category = categories.filter((cat) => cat.title === title)[0])
	}

	constructor(
		private categoryService: CategoryService,
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
