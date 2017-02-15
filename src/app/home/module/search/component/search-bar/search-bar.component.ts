import {Component, EventEmitter, Output} from "@angular/core"

@Component({
	selector: 'search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
	@Output() keywordChanged:EventEmitter<string> = new EventEmitter<string>()

	valueChanged(value: string) {
		this.keywordChanged.emit(value)
	}
}
