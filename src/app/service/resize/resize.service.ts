import {Injectable} from "@angular/core"
import {BehaviorSubject} from "rxjs/BehaviorSubject"

@Injectable()
export class ResizeService {
	public window = new BehaviorSubject(null);

	constructor() {
		window.onresize = (e) => {
			this.window.next(e.target)
		}
	}
}