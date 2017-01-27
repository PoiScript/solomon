import {Component, HostListener, OnInit, ViewChild} from "@angular/core"
import {MdSidenav} from "@angular/material"
import {ThemeService} from "./service/theme/theme.service"
import {Subscription} from "rxjs"

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	isDarkTheme: boolean = false
	isSMLayout: boolean
	@ViewChild('sidenav') sidenav: MdSidenav
	themeSubscription: Subscription

	constructor(private themeService: ThemeService) {
		this.themeSubscription = themeService.toggleTheme$
			.subscribe(
				() => this.isDarkTheme = !this.isDarkTheme
			)
	}

	ngOnInit(): void {
		window.innerWidth > 960 ? this.isSMLayout = false : this.isSMLayout = true
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		event.target.innerWidth > 960 ? this.isSMLayout = false : this.isSMLayout = true
	}
}