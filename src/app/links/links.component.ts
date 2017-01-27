import {Component, OnInit} from "@angular/core"
import {LinkService} from "../service/link/link.service"
import {Link} from "../classes/Link"

@Component({
	templateUrl: './links.component.html',
	styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
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
