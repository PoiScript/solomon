import {Component, HostListener, OnInit} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {PostService} from "../../service/post"
import {Post} from "../../classes/Post"
import {DomSanitizer, SafeHtml, Title} from "@angular/platform-browser"
import {Comment} from "../../classes/Comment"
import {GitHubService} from "../../service/github"
import {Location} from "@angular/common"
import {ThemeService} from "../../service/theme"
import {ScrollService} from "../../service/scroll/scroll.service"

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [ScrollService]
})

export class PostComponent implements OnInit {
  toTopVisibility: boolean
  isDark: boolean
  safeHtml: SafeHtml
  post: Post
  comments: Comment[]

  constructor(private postService: PostService,
              private location: Location,
              private titleService: Title,
              private sanitizer: DomSanitizer,
              private themeService: ThemeService,
              private githubService: GitHubService,
              private router: ActivatedRoute) {
  }

  backClicked(): void {
    this.location.back()
  }

  toTopClicked(): void {
    window.scrollTo(0, 0)
  }

  jumpTo(id: string): void {
    window.location.hash = id
  }

  @HostListener('window:scroll', ['$event'])
  changeVisibility() {
    this.toTopVisibility = document.body.scrollTop > 500
  }

  getPost(slug: string): void {
    this.postService
      .getPost(slug)
      .then(post => {
        this.post = post
        this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.post.html)
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
