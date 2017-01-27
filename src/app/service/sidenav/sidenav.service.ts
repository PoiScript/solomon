import {Injectable} from "@angular/core"
import {Subject} from "rxjs"

@Injectable()
export class SideNavService {
	private toggleSideNavSource = new Subject()
	private closeSideNavSource = new Subject()

	toggleSideNav$ = this.toggleSideNavSource.asObservable()
	closeSideNav$ = this.closeSideNavSource.asObservable()

	toggleSideNav() {
		this.toggleSideNavSource.next()
	}

	closeSideNav() {
		this.closeSideNavSource.next()
	}
}