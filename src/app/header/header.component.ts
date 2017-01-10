import {Component, Input} from "@angular/core"
import {MdSidenav} from "@angular/material"

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	host: {'(scroll)': 'track($event)'},
})

export class HeaderComponent{
	@Input() sidenav: MdSidenav

	track($event) {
		console.log('test')
	}
}