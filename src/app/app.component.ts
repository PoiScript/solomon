import {Component, ViewChild, HostListener, OnInit, OnDestroy} from "@angular/core"
import {MdSidenav} from "@angular/material"
import {PostService} from "./service/post/post.service"
import {ThemeService} from "./service/theme/theme.service"
import {Subscription} from "rxjs"

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [PostService]
})

export class AppComponent implements OnInit, OnDestroy {
	isDarkTheme: boolean = false
	@ViewChild('sidenav') sidenav: MdSidenav
	subscription: Subscription

	constructor(private themeService: ThemeService) {
		this.subscription = themeService.toggleTheme$
			.subscribe(
				() => this.isDarkTheme = !this.isDarkTheme
			)
	}

	ngOnInit(): void {
		if (window.innerWidth <= 960) {
			this.sidenav.close()
			this.sidenav.mode = "over"
		} else {
			this.sidenav.open()
			this.sidenav.mode = "side"
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		if (event.target.innerWidth <= 960) {
			this.sidenav.mode = "over"
		} else {
			this.sidenav.open()
			this.sidenav.mode = "side"
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}
}