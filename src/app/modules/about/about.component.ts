import {Component, OnInit} from "@angular/core"
import {Title} from "@angular/platform-browser"

@Component({
	templateUrl: './about.component.html'
})

export class AboutComponent implements OnInit {
	constructor(private titleService: Title) {
	}

	ngOnInit(): void {
		this.titleService.setTitle('About - Solomon')
	}
}