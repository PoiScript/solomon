import {Component, Input, OnDestroy, OnInit} from "@angular/core"
import {Category} from "../classes/Category"
import {CategoryService} from "../service/category"
import {Subscription} from "rxjs"
import {MdDialog, MdSidenav} from "@angular/material"
import {SideNavService} from "../service/sidenav/sidenav.service"
import {SettingsDialogComponent} from "../components/settings-dialog/settings-dialog.component"

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit, OnDestroy {
	@Input() sideNav: MdSidenav
	categories: Category[]
	toggleSubscription: Subscription
	closeSubscription: Subscription

	menu = [{title: 'Recent', path: '/recent'},
		{title: 'Search', path: '/search'},
		{title: 'About', path: '/about'},
		{title: 'Link', path: '/link'},
		{title: 'Archive', path: '/archive'}]

	constructor(public dialog: MdDialog,
	            private categoryService: CategoryService,
	            private sideNavService: SideNavService) {
		this.toggleSubscription = sideNavService.toggleSideNav$
			.subscribe(() => this.sideNav.toggle())
		this.closeSubscription = sideNavService.closeSideNav$
			.subscribe(() => this.sideNav.close())
	}

	getCategorise(): void {
		this.categoryService
			.getCategories()
			.then((categories) => this.categories = categories)
	}

	openDialog(): void {
		this.dialog.open(SettingsDialogComponent)
	}

	ngOnInit(): void {
		this.getCategorise()
	}

	ngOnDestroy(): void {
		this.closeSubscription.unsubscribe()
		this.toggleSubscription.unsubscribe()
	}
}