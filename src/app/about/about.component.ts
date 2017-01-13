import {Component, OnInit} from "@angular/core"
import {TitleService} from "../service/title/title.service"

@Component({
	selector: 'about',
	templateUrl: './about.component.html'
})

export class AboutComponent implements OnInit {
	constructor(private titleService: TitleService) {
	}

	ngOnInit(): void {
		this.titleService.announceTitle("About")
	}

}