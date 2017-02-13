import {Component, OnInit} from "@angular/core"
import {Title} from "@angular/platform-browser"
import {PostService} from "../../service/post/post.service"
import {Post} from "../../classes/Post"

@Component({
  template: `
    <app-header [title]="'About'"></app-header>
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
