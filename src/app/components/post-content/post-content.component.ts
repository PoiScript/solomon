import {Component, Inject, Input} from "@angular/core"
import {Post} from "../../classes/Post"
import {SolomonConfig} from "../../interface/solomon-config"
import {CONFIG_TOKEN} from "../../config"
import {DomSanitizer, SafeHtml} from "@angular/platform-browser"

@Component({
  selector: 'post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent {
  @Input() post: Post
  GITHUB_USERNAME: string
  GITHUB_POST_REPO: string
  safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.post.html)

  constructor(@Inject(CONFIG_TOKEN) config: SolomonConfig,
              private sanitizer: DomSanitizer) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
  }

  goTop(id: string): void {
    window.location.hash = id
  }
}
