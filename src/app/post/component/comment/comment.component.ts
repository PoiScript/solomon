import {Component, Inject, Input} from "@angular/core"
import {CONFIG_TOKEN} from "../../../config"
import {SolomonConfig} from "../../../share/interface/solomon-config"
import {Comment} from "../../../share/classes/Comment"

export const enum Sort {
  Oldest, Newest
}

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent {
  @Input() issue_number: number
  @Input() comments: Comment[]
  sortBy: Sort = Sort.Newest
  GITHUB_USERNAME: string
  GITHUB_POST_REPO: string

  constructor(@Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
  }


}
