import {Component, OnInit, OnDestroy} from "@angular/core"
import {global} from "../../config/global"
import {Category} from "../classes/Category"
import {CategoryService} from "../service/category/category.service"
import {ThemeService} from "../service/theme/theme.service"
import {Subscription} from "rxjs"

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit, OnDestroy {
	menu = global.menu
	categories: Category[]
	subscription: Subscription
	isDark: boolean = false

	constructor(private categoryService: CategoryService,
	            private themeService: ThemeService) {
		this.subscription = themeService.confirmToggle$
			.subscribe(
				() => this.isDark = !this.isDark
			)
	}

	getCategorise(): void {
		this.categoryService
			.getCategories()
			.then((categories) => this.categories = categories)
	}

	toggleTheme(): void {
		this.themeService.toggleTheme()
	}

	ngOnInit(): void {
		this.getCategorise()
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}
}