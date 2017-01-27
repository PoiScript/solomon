import {Component, Input, OnInit} from "@angular/core"
import {SideNavService} from "../../service/sidenav"
import {Location} from "@angular/common"

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
	@Input() title: string
	@Input() isPostPage: boolean = false

	constructor(private sideNavService: SideNavService,
							private location: Location) {
	}

	backClicked(): void {
		this.location.back()
	}

	toggleSideNav(): void {
		this.sideNavService.toggleSideNav()
	}

	ngOnInit(): void {
		if(this.isPostPage == true){
		}
	}

}