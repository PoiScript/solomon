import {Component, Input} from "@angular/core"
import {Post} from "../../service/post/post"

@Component({
	selector: 'post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
	@Input() posts: Post[]
	@Input() limit: Number
	@Input() title: string
}