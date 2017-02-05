import {Component, Input} from "@angular/core"
import {Comment} from "../../classes/Comment"

export const enum Sort {
	Oldest, Newest
}

@Component({
	selector: 'comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css']
})

export class CommentComponent {
	@Input() issue_number: number
	@Input() comments: Comment[]
	sortBy: Sort = Sort.Newest
}
