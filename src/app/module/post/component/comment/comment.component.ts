import {Component, Inject, Input, OnInit} from '@angular/core'
import {AngularFire, FirebaseAuthState} from 'angularfire2'
import {MdDialog, MdIconRegistry} from '@angular/material'
import {DomSanitizer} from '@angular/platform-browser'

import {SnackBarService} from '../../../../service/snackbar'
import {TokenService} from '../../../../service/token'
import {GitHubService} from '../../../../service/github'
import {SolomonConfig} from '../../../../interface/solomon-config'
import {CONFIG_TOKEN} from '../../../../config'
import {Comment} from '../../../../class/comment'
import {UserProfileComponent} from '../../../../component/user-profile'

export const enum Sort {
  Oldest, Newest, Reaction
}

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit {
  private token: string
  isAuth: boolean
  user: FirebaseAuthState
  @Input() issue_number: number
  @Input() comments: Comment[]
  GITHUB_USERNAME: string
  GITHUB_POST_REPO: string
  comment_body: string

  constructor(@Inject(CONFIG_TOKEN) config: SolomonConfig,
              private githubService: GitHubService,
              private tokenService: TokenService,
              private snackBarService: SnackBarService,
              private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer,
              private dialog: MdDialog,
              private af: AngularFire) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
    this.tokenService.token$.subscribe(token => this.token = token)
    this.af.auth.subscribe(
      user => {
        if (user) {
          this.isAuth = true
          this.user = user
        } else {
          this.isAuth = false
          this.token = ''
        }
      },
      error => console.trace(error)
    )
    iconRegistry.addSvgIcon('sort', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/sort.svg'))
    iconRegistry.addSvgIcon('like', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/like.svg'))
    iconRegistry.addSvgIcon('dislike', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/dislike.svg'))
    iconRegistry.addSvgIcon('send', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/send.svg'))
  }

  sortComment(sortBy: Sort): void {
    switch (sortBy) {
      case Sort.Newest:
        this.comments.sort((c1, c2) => Date.parse(c1.updated_at) - Date.parse(c2.updated_at))
        break
      case Sort.Oldest:
        this.comments.sort((c1, c2) => Date.parse(c2.updated_at) - Date.parse(c1.updated_at))
        break
      case Sort.Reaction:
      default:
        this.comments.sort((c1, c2) => c2.reactions.total_count - c1.reactions.total_count)
    }
  }

  viewProfile(): void {
    this.dialog.open(UserProfileComponent)
  }

  mention(username: string): void {
    if (this.comment_body) this.comment_body += `@${username} `
    else this.comment_body = `@${username} `
  }

  clearComment(): void {
    this.comment_body = ''
  }

  postComment(): void {
    if (this.token && this.comment_body) {
      this.githubService
        .createComment(this.token, this.issue_number, this.comment_body)
    } else if (!this.comment_body) {
      this.snackBarService.openSnackBar('Comment can not be empty!')
    } else if (!this.token) {
      this.snackBarService.openSnackBar('AccessToken not found, please re-login.')
    }
  }

  deleteComment(commend_id: number): void {
    if (this.token) {
      this.githubService
        .deleteComment(this.token, commend_id)
    } else {
      console.error('Token missing')
    }
  }

  editComment(commend_id: number, body: string): void {
    if (this.token) {
      this.githubService
        .editComment(this.token, commend_id, body)
    } else {
      console.error('Token missing')
    }
  }

  createReaction(commend_id: number, contend: string): void {
    if (this.token) {
      this.githubService
        .createReaction(this.token, contend, commend_id)
    } else {
      console.error('Token missing')
    }
  }

  deletReaction(commend_id: number): void {
    if (this.token) {
      this.githubService
        .deleteReaction(this.token, commend_id)
    } else {
      console.error('Token missing')
    }
  }

  ngOnInit(): void {
    this.token = this.tokenService.getToken()
  }
}
