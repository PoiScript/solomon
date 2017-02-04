import {Injectable} from "@angular/core"
import {Subject} from "rxjs"

@Injectable()
export class SideNavService {
	private toggleSideNavSource = new Subject()

	toggleSideNav$ = this.toggleSideNavSource.asObservable()

	toggleSideNav() {
		this.toggleSideNavSource.next()
	}
}