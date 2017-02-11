import {Component, OnInit} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {PostService} from "../../service/post"
import {Post} from "../../classes/Post"
import {Title} from "@angular/platform-browser"
import {Comment} from "../../classes/Comment"
import {GitHubService} from "../../service/github/github.service"
import {Location} from "@angular/common"
import {ThemeService} from "../../service/theme/theme.service"

@Component({
  template: `
    <div class="post-container">
      <button md-fab (click)="backClicked()" [color]="'primary'">
        <md-icon>keyboard_backspace</md-icon>
      </button>
      <post-content [post]="post"></post-content>
      <comment [comments]="comments" [issue_number]="post?.intro.issue_number"></comment>
    </div>
  `,
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  isDark: boolean
  post: Post
  comments: Comment[]

  constructor(private postService: PostService,
              private location: Location,
              private titleService: Title,
              private themeService: ThemeService,
              private githubService: GitHubService,
              private router: ActivatedRoute) {
  }

  backClicked(): void {
    this.location.back()
  }

  getPost(slug: string): void {
    this.postService
      .getPost(slug)
      .then(post => {
        this.post = post
        this.titleService.setTitle(`${post.intro.title} - Solomon`)
        return post.intro.issue_number
      })
      .then(number => this.githubService.getIssueComments(number).then(comments => this.comments = comments))
  }

  ngOnInit(): void {
    this.router.params
      .subscribe(params => this.getPost(params['slug']))
    this.isDark = this.themeService.getTheme()
    console.log(this.isDark)
  }
}
