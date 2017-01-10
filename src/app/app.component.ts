import {Component, ViewChild, HostListener, OnInit} from "@angular/core"
import {MdSidenav} from "@angular/material"
import {PostService} from "./service/post/post.service"

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [PostService]
})

export class AppComponent implements OnInit {
	@ViewChild('sidenav') sidenav: MdSidenav

	ngOnInit() {
		if (window.innerWidth <= 960) {
			this.sidenav.close()
			this.sidenav.mode = "over"
		} else {
			this.sidenav.open()
			this.sidenav.mode = "side"
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		if (event.target.innerWidth <= 960) {
			this.sidenav.mode = "over"
		} else {
			this.sidenav.open()
			this.sidenav.mode = "side"
		}
	}
}