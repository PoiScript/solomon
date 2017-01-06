import {Component, Input} from "@angular/core"
import {MdSidenav} from "@angular/material"

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})

export class HeaderComponent {
	@Input() sidenav: MdSidenav

	toggleSideNav() {
		this.sidenav.toggle()
	}
}