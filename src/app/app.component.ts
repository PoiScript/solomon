import {Component, HostListener, OnInit, ViewChild} from "@angular/core"
import {MdSidenav} from "@angular/material"
import {ThemeService} from "./service/theme/theme.service"
import {Subscription} from "rxjs"

@Component({
	selector: 'app',
	template: `
    <md-sidenav-container fullscreen [class.dark]="isDarkTheme">
      <md-sidenav #sidenav [opened]="!isSMLayout" [mode]="isSMLayout?'over':'side'">
        <app-nav [sideNav]="sidenav"></app-nav>
      </md-sidenav>
      <router-outlet></router-outlet>
    </md-sidenav-container>
	`,
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	isDarkTheme: boolean = false
	isSMLayout: boolean
	@ViewChild('sidenav') sidenav: MdSidenav
	themeSubscription: Subscription

	constructor(private themeService: ThemeService) {
		this.themeSubscription = themeService.toggleTheme$.subscribe(
			() => this.isDarkTheme = !this.isDarkTheme
		)
	}

	ngOnInit(): void {
		this.isSMLayout = window.innerWidth <= 960
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.isSMLayout = event.target.innerWidth <= 960
	}
}