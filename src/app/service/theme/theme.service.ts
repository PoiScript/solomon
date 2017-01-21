import {Injectable} from "@angular/core"
import {Subject} from "rxjs"

@Injectable()
export class ThemeService {

	private toggleThemeSource = new Subject()
	private confirmToggleSource = new Subject()

	toggleTheme$ = this.toggleThemeSource.asObservable()
	confirmToggle$ = this.confirmToggleSource.asObservable()

	toggleTheme() {
		this.toggleThemeSource.next()
	}

	confirmToggle() {
		this.confirmToggleSource.next()
	}

}
