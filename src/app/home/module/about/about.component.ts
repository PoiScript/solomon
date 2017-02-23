import {Component, OnInit} from "@angular/core"
import {Title} from "@angular/platform-browser"
import {PostService} from "../../../share/service/post"
import {Post} from "../../../share/classes/Post"

@Component({
  template: `
    <app-header i18n-title title="About"></app-header>
    <div class="container">
      <div class="markdown-body" [innerHTML]="post?.html"></div>
    </div>
  `
})

export class AboutComponent implements OnInit {
  post: Post

  constructor(private titleService: Title,
              private postService: PostService) {
  }

  getAbout(): void {
    this.postService
      .getPost('about')
      .then(post => this.post = post)
  }

  ngOnInit(): void {
    this.titleService.setTitle('About - Solomon')
    this.getAbout()
  }
}
