import {Component, OnInit} from "@angular/core"
import {GitHubService} from "../../service/github/github.service"
import {Comment} from "../../classes/Comment"

export const enum Sort {
	Oldest, Newest
}

@Component({
	selector: 'comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
	comments: Comment[]
	sortBy: Sort = Sort.Newest

	constructor(private githubService: GitHubService) {
	}

	getIssueComments(): void {
		this.githubService
			.getIssueComments()
			.then(comments => this.comments = comments)
	}

	ngOnInit() {
		this.getIssueComments()
	}

}
