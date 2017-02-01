import {Component, Input, OnDestroy, OnInit} from "@angular/core"
import {Subscription} from "rxjs"
import {MdDialog, MdSidenav} from "@angular/material"
import {Category} from "../../classes/Category"
import {CategoryService} from "../../service/category"
import {SideNavService} from "../../service/sidenav"
import {SettingsDialogComponent} from "../settings-dialog"

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
	openSubscription: Subscription

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
		this.openSubscription = sideNavService.openSideNav$
			.subscribe(() => this.sideNav.open())
	}

	getCategorise(): void {
		this.categoryService
			.getCategories()
			.then((categories) => this.categories = categories)
	}

	openDialog(): void {
		this.dialog.open(SettingsDialogComponent)
	}

	titleClick(): void {
		console.log('Title Clicked.')
	}

	ngOnInit(): void {
		this.getCategorise()
	}

	ngOnDestroy(): void {
		this.closeSubscription.unsubscribe()
		this.toggleSubscription.unsubscribe()
		this.openSubscription.unsubscribe()
	}
}