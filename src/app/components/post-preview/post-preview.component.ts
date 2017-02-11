import {Component, Inject, Input} from "@angular/core"
import {Intro} from "../../classes/Post"
import {SolomonConfig} from "../../interface/solomon-config"
import {CONFIG_TOKEN} from "../../config"


@Component({
  selector: 'post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent {
  @Input() intro: Intro
  GITHUB_USERNAME: string
  GITHUB_POST_REPO: string

  constructor(@Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
  }
}
