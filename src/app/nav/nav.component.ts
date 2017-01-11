import {Component, Input, OnInit} from "@angular/core"
import {global} from "../../config/global"
import {PostService} from "../service/post"
import {Category} from "../service/post/category"

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit {
	menu = global.menu
	categories: Category[]
	@Input() isDarkTheme: boolean

	constructor(private postService: PostService) {
	}

	getCategories(): void {
		this.postService
			.getCategories()
			.then(categories => this.categories = categories)
	}

	ngOnInit(): void {
		this.getCategories()
	}
}