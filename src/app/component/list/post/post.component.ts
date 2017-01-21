import {Component, Input} from "@angular/core"
import {Post} from "../../../classes/Post"

@Component({
	selector: 'post-list',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostListComponent {
	@Input() posts: Post[]
	@Input() limit: Number
	@Input() title: string
}