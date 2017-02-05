import {Component, Input} from "@angular/core"
import {SearchResult} from "../../classes/SearchResult"

@Component({
	selector: 'search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
	@Input() result: SearchResult

	// static highlight(fragment: string, matches: [{ text: string, indices: number[] }]): string {
	// 	let result = fragment
	// 	matches.forEach(match => {
	// 		result = result.substring(0, ind) + '233' + result.substring(ind, end) + '233' + result.substring(end, code.length)
	// 	})
	// }
}
