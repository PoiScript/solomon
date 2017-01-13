import {Component, OnInit} from "@angular/core"
import {TitleService} from "../service/title/title.service"

@Component({
	selector: 'home',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.css'],
})

export class RecentComponent implements OnInit {
	title: 'Recent'

	constructor(private titleService: TitleService) {
	}

	ngOnInit(): void {
		this.titleService.announceTitle("Recent")
	}
}