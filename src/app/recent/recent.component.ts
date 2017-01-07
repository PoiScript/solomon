import {Component, HostListener} from "@angular/core"

@Component({
	selector: 'home',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.css']
})

export class RecentComponent {
	title: 'Home'

	@HostListener('window:scroll', ['$event'])
	track(event) {
		console.debug("Scroll Event", event);
	}
}