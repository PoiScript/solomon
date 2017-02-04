import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core"
import {MdDialog, MdSidenav} from "@angular/material"
import {SettingsDialogComponent} from "../settings-dialog/settings-dialog.component"
import {SideNavService} from "../../service/sidenav/sidenav.service"
import {CategoryService} from "../../service/category/category.service"
import {Subscription} from "rxjs"
import {Category} from "../../classes/Category"
import {ResizeService} from "../../service/resize/resize.service"

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [
		ResizeService,
		SideNavService,
		CategoryService
	]
})

export class HomeComponent implements OnInit, OnDestroy {
	isSMLayout: boolean
	@ViewChild('sidenav') sideNav: MdSidenav
	categories: Category[]
	toggleSubscription: Subscription
	resizeSubscription: Subscription

	constructor(public dialog: MdDialog,
	            private categoryService: CategoryService,
	            private sideNavService: SideNavService,
	            private resizeService: ResizeService) {
		this.toggleSubscription = sideNavService.toggleSideNav$
			.subscribe(() => this.sideNav.toggle())
		this.resizeSubscription = resizeService.window.subscribe(val => {
			if (val) this.isSMLayout = val.innerWidth <= 960
		})
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
		this.isSMLayout = window.innerWidth <= 960
		this.getCategorise()
	}

	ngOnDestroy(): void {
		this.toggleSubscription.unsubscribe()
		this.resizeSubscription.unsubscribe()
	}
}
