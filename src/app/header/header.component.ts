import {Component, OnDestroy} from "@angular/core"
import {TitleService} from "../service/title/title.service"
import {Subscription} from "rxjs"
import {SideNavService} from "../service/sidenav"

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})

export class HeaderComponent implements OnDestroy {
	subscription: Subscription
	title: string

	constructor(private titleService: TitleService,
	            private sideNavService: SideNavService) {
		this.subscription = titleService.titleAnnounced$
			.subscribe(
				title => this.title = title
			)
	}

	toggleSideNav(): void {
		this.sideNavService.toggleSideNav()
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}
}