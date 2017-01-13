import {Component, OnInit} from "@angular/core"
import {LinkService} from "../service/link/link.service"
import {TitleService} from "../service/title/title.service"
import {Link} from "../service/link/link"

@Component({
	templateUrl: './links.component.html',
	styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
	links: Link[]

	constructor(private titleService: TitleService,
	            private linkService: LinkService) {
	}

	getLinks(): void {
		this.linkService.getLinks()
			.then(links => this.links = links)
	}

	ngOnInit() {
		this.titleService.announceTitle("Links")
		this.getLinks()
	}
}
