import {Component, HostListener, OnInit, ViewChild} from "@angular/core"
import {MdSidenav} from "@angular/material"

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	isSMLayout: boolean
	@ViewChild('sidenav') sidenav: MdSidenav


	ngOnInit(): void {
		this.isSMLayout = window.innerWidth <= 960
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.isSMLayout = event.target.innerWidth <= 960
	}
}
