import {Component, OnInit} from "@angular/core"
import {global} from "../../config/global"
import {Category} from "../service/post/category"
import {CategoryService} from "../service/category/category.service"

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit {
	menu = global.menu
	categories: Category[]

	constructor(private categoryService: CategoryService) {
	}

	getCategorise(): void {
		this.categoryService
			.getCategories()
			.then((categories) => this.categories = categories)
	}

	announce(title: string): void {
		this.categoryService.announceCategory(
			this.categories.filter((category) => category.title === title)[0]
		)
	}

	ngOnInit(): void {
		this.getCategorise()
	}
}