import {Inject, Injectable} from '@angular/core'
import {Headers, Http} from '@angular/http'
import {Repo} from '../../classes/Repo'
import {Comment} from '../../classes/Comment'
import {SearchResult} from '../../classes/SearchResult'
import {CONFIG_TOKEN} from '../../../config'
import {SolomonConfig} from '../../interface/solomon-config'
import {Issue} from '../../classes/issue'

@Injectable()
export class GitHubService {
  private GITHUB_USERNAME: string
  private GITHUB_POST_REPO: string
  issues: Issue[]

  constructor(private http: Http,
              @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
  }

  getRepos(): Promise<Repo[]> {
    return this.http
      .get(`https://api.github.com/users/${this.GITHUB_USERNAME}/repos?type=all&sort=pushed`)
      .toPromise()
      .then(res => res.json() as Repo[])
  }

  getIssueCommentCount(title: string): Promise<number> {
    if (this.issues) return new Promise(resolve => resolve(this.issues.find(issue => issue.title === title).comments))
    return this.http
      .get(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues`)
      .toPromise()
      .then(res => res.json() as Issue[])
      .then(issues => this.issues = issues)
      .then(issues => issues.find(issue => issue.title === title).comments)
  }

  getIssueComments(number: Number): Promise<Comment[]> {
    let headers = new Headers()
    headers.append('Accept', 'application/vnd.github.squirrel-girl-preview')
    headers.append('Accept', 'application/vnd.github.VERSION.html+json')
    return this.http
      .get(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues/${number}/comments`, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json() as Comment[])
  }

  searchCode(keyword: string): Promise<SearchResult> {
    let headers = new Headers()
    headers.append('Accept', 'application/vnd.github.v3.text-match+json')
    return this.http
      .get(`https://api.github.com/search/code?q=repo:${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}+extension:md+${keyword}`, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json() as SearchResult)
  }

  createComment(token: string, issue_id: Number, body: string): Promise<Comment> {
    let headers = new Headers()
    headers.append('Authorization', `token ${token}`)
    return this.http
      .post(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues/${issue_id}/comments`, {body}, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json() as Comment)
  }

  editComment(token: string, commend_id: Number, body: string): Promise<Comment> {
    let headers = new Headers()
    headers.append('Authorization', `token ${token}`)
    return this.http
      .patch(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues/${commend_id}/comments`, {body}, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json() as Comment)
  }

  deleteComment(token: string, commend_id: Number) {
    let headers = new Headers()
    headers.append('Authorization', `token ${token}`)
    return this.http
      .delete(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues/comments/${commend_id}`)
  }

  createReaction(token: string, content: string, comment_id: number) {
    let headers = new Headers()
    headers.append('Authorization', `token ${token}`)
    headers.append('Accept', 'application/vnd.github.squirrel-girl-preview')
    return this.http
      .post(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues/comments/${comment_id}/reactions`, {content}, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json())
  }

  deleteReaction(token: string, reaction_id: number) {
    let headers = new Headers()
    headers.append('Authorization', `token ${token}`)
    return this.http
      .delete(`https://api.github.com/reactions/${reaction_id}`)
  }
}
