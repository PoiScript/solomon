import {Component} from "@angular/core"
import {ThemeService} from "../../service/theme"

@Component({
	selector: 'app-settings-dialog',
	templateUrl: './settings-dialog.component.html',
	styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent {

	constructor(private themeService: ThemeService) {
	}

	toggleTheme(): void {
		this.themeService.toggleTheme()
	}

}
