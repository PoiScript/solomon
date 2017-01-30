import {Component, OnInit} from "@angular/core"
import {LinkService} from "../../service/link/link.service"
import {Link} from "../../classes/Link"
import {Title} from "@angular/platform-browser"

@Component({
	template:`
    <app-header [title]="'Link'"></app-header>
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
		this.titleService.setTitle('Link - PoiScript\'s Blog')
	}
}
