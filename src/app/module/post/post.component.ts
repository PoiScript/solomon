import {animate, Component, HostListener, Inject, OnInit, state, style, transition, trigger} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Title} from '@angular/platform-browser'

import {Post} from '../../class/post'
import {CONFIG_TOKEN} from '../../config'
import {PostService} from '../../service/post'
import {SolomonConfig} from '../../interface/solomon-config'
import {GitHubService} from '../../service/github'


@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('toTopState', [
      state('true', style({transform: 'translateY(0)'})),
      state('false', style({transform: 'translateY(200%)'})),
      transition('1 => 0', animate(200)),
      transition('0 => 1', animate(200))
    ])
  ]
})

export class PostComponent implements OnInit {
  private GITHUB_USERNAME: string
  private GITHUB_POST_REPO: string
  private BLOG_NAME: string
  toTopVisibility: boolean = false
  post: Post
  comments: Comment[]

  constructor(@Inject(CONFIG_TOKEN) config: SolomonConfig,
              private postService: PostService,
              private titleService: Title,
              private githubService: GitHubService,
              private router: ActivatedRoute) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
    this.BLOG_NAME = config.BLOG_NAME
  }

  toTopClicked(): void {
    window.scrollTo(0, 0)
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
        this.titleService.setTitle(`${post.intro.title} - ${this.BLOG_NAME}`)
        return post.intro.issue_number
      })
      .then(number => this.githubService.getIssueComments(number).then(comments => this.comments = comments))
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => this.getPost(params['slug']))
  }
}
