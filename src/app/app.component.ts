import {Component, ViewChild, HostListener, OnInit, OnDestroy} from "@angular/core"
import {MdSidenav} from "@angular/material"
import {ThemeService} from "./service/theme/theme.service"
import {Subscription} from "rxjs"
import {SideNavService} from "./service/sidenav"

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
	isDarkTheme: boolean = false
	isSMLayout: boolean
	@ViewChild('sidenav') sidenav: MdSidenav
	themeSubscription: Subscription
	sideNavSubscription: Subscription

	constructor(private themeService: ThemeService,
	            private sideNavService: SideNavService) {
		this.themeSubscription = themeService.toggleTheme$
			.subscribe(
				() => {
					this.isDarkTheme = !this.isDarkTheme
					themeService.confirmToggle()
				}
			)
		this.sideNavSubscription = sideNavService.toggleSideNav$
			.subscribe(
				() => this.sidenav.toggle()
			)
	}

	ngOnInit(): void {
		window.innerWidth > 960 ? this.isSMLayout = false : this.isSMLayout = true
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		event.target.innerWidth > 960 ? this.isSMLayout = false : this.isSMLayout = true
	}

	ngOnDestroy(): void {
		this.themeSubscription.unsubscribe()
		this.sideNavSubscription.unsubscribe()
	}
}