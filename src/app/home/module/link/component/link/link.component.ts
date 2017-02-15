import {Component, Input} from "@angular/core"
import {Link} from "../../../../../share/classes/Link"

@Component({
	selector: 'link-list',
	templateUrl: 'link.component.html',
	styleUrls: ['link.component.css']
})
export class LinkListComponent {
	@Input() links: Link[]
}
