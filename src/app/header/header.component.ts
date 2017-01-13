import {Component, Input, OnDestroy} from "@angular/core"
import {MdSidenav} from "@angular/material"
import {TitleService} from "../service/title/title.service"
import {Subscription} from "rxjs"

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})

export class HeaderComponent implements OnDestroy {
	subscription: Subscription
	@Input() sidenav: MdSidenav
	title: string

	constructor(private titleService: TitleService) {
		this.subscription = titleService.titleAnnounced$
			.subscribe(
				title => this.title = title
			)
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}
}