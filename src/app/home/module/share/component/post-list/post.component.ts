import {Component, Input} from "@angular/core"
import {Intro} from "../../../../../share/classes/Post"

@Component({
	selector: 'post-list',
	templateUrl: 'post.component.html',
	styleUrls: ['post.component.css']
})
export class PostListComponent {
	@Input() intros: Intro[]
	@Input() limit: Number
	@Input() title: string
}
