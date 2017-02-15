import {Component, Inject, Input, OnInit} from "@angular/core"
import {CONFIG_TOKEN} from "../../../config"
import {SolomonConfig} from "../../../share/interface/solomon-config"
import {GitHubService} from "../../../share/service/github"
import {Comment} from "../../../share/classes/Comment"

export const enum Sort {
  Oldest, Newest
}

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
  @Input() issue_number: number
  comments: Comment[]
  sortBy: Sort = Sort.Newest
  GITHUB_USERNAME: string
  GITHUB_POST_REPO: string

  constructor(@Inject(CONFIG_TOKEN) config: SolomonConfig,
              private githubService: GitHubService) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
  }

  getIssueComments(): void {
    this.githubService
      .getIssueComments(this.issue_number)
      .then(comments => this.comments = comments)
  }

  ngOnInit(): void {
    this.getIssueComments()
  }
}
