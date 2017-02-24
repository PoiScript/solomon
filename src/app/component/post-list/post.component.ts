import {Component, Input} from "@angular/core"
import {Intro} from '../../class/post'

@Component({
	selector: 'solomon-post-list',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostListComponent {
	@Input() intros: Intro[]
	@Input() limit: Number
	@Input() title: string
}
