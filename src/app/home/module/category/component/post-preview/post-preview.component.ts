import {Component, Inject, Input, OnInit} from "@angular/core"
import {Intro} from "../../../../../share/classes/Post"
import {CONFIG_TOKEN} from "../../../../../config"
import {SolomonConfig} from "../../../../../share/interface/solomon-config"
import {GitHubService} from "../../../../../share/service/github"


@Component({
  selector: 'post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
  @Input() intro: Intro
  commentCount: number
  GITHUB_USERNAME: string
  GITHUB_POST_REPO: string

  constructor(@Inject(CONFIG_TOKEN) config: SolomonConfig,
              private githubService: GitHubService) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
  }

  getIssueCommentCount(title: string): void {
    this.githubService
      .getIssueCommentCount(title)
      .then(count => this.commentCount = count)
  }

  ngOnInit(): void {
    this.getIssueCommentCount(this.intro.slug)
  }
}
