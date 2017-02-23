import {Component, OnInit} from "@angular/core"
import {Title} from "@angular/platform-browser"
import {Link} from "../../../share/classes/Link"
import {LinkService} from "./service/link"

@Component({
	template:`
    <app-header i18n-title title="Link"></app-header>
    <link-list [links]="links"></link-list>
	`
})
export class LinkComponent implements OnInit {
	links: Link[]

	constructor(private linkService: LinkService,
	            private titleService: Title) {
	}

	getLinks(): void {
		this.linkService.getLinks()
			.then(links => this.links = links)
	}

	ngOnInit() {
		this.getLinks()
		this.titleService.setTitle('Link - Solomon')
	}
}
