import {Component, OnInit} from "@angular/core"
import {LinkService} from "../../service/link/link.service"
import {Link} from "../../classes/Link"

@Component({
	template:`
    <app-header [title]="'Link'"></app-header>
    <link-list [links]="links"></link-list>
	`
})
export class LinkComponent implements OnInit {
	links: Link[]

	constructor(private linkService: LinkService) {
	}

	getLinks(): void {
		this.linkService.getLinks()
			.then(links => this.links = links)
	}

	ngOnInit() {
		this.getLinks()
	}
}
