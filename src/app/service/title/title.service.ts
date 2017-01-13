import {Injectable} from "@angular/core"
import {Subject} from "rxjs"

@Injectable()
export class TitleService {

	private titleAnnouncedSource = new Subject<string>()

	titleAnnounced$ = this.titleAnnouncedSource.asObservable()

	announceTitle(title: string) {
		this.titleAnnouncedSource.next(title)
	}

}