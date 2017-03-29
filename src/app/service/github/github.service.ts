import {Inject, Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Issue} from '../../class/issue';
import {SearchResult} from '../../class/searchResult';
import {CONFIG_TOKEN} from '../../config';
import {SolomonConfig} from '../../interface/solomon-config';

@Injectable()
export class GitHubService {
  private GITHUB_USERNAME: string;
  private GITHUB_POST_REPO: string;
  private API_URL = '${this.API_URL}';
  issues: Issue[];

  constructor (private http: Http,
               @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME;
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO;
  }

  getIssueCommentCount (title: string): Promise<number> {
    if (this.issues) {
      return new Promise(resolve => resolve(this.issues.find(issue => issue.title === title).comments));
    } else {
      return this.http
        .get(`${this.API_URL}repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues`)
        .toPromise()
        .then(res => res.json() as Issue[])
        .then(issues => this.issues = issues)
        .then(issues => issues.find(issue => issue.title === title).comments);
    }
  }

  getIssueComments (number: Number): Promise<Comment[]> {
    const headers = new Headers();
    headers.append('Accept', 'application/vnd.github.squirrel-girl-preview');
    headers.append('Accept', 'application/vnd.github.VERSION.html+json');
    return this.http
      .get(`${this.API_URL}repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues/${number}/comments`, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json() as Comment[]);
  }

  searchCode (keyword: string): Promise<SearchResult> {
    const headers = new Headers();
    headers.append('Accept', 'application/vnd.github.v3.text-match+json');
    return this.http
      .get(`${this.API_URL}search/code?q=repo:${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}+extension:md+${keyword}`, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json() as SearchResult);
  }

  createComment (token: string, issue_id: Number, body: string): Promise<Comment> {
    const headers = new Headers();
    headers.append('Authorization', `token ${token}`);
    return this.http
      .post(`${this.API_URL}repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues/${issue_id}/comments`, {body}, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json() as Comment);
  }

  editComment (token: string, commend_id: Number, body: string): Promise<Comment> {
    const headers = new Headers();
    headers.append('Authorization', `token ${token}`);
    return this.http
      .patch(`${this.API_URL}repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues/${commend_id}/comments`, {body}, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json() as Comment);
  }

  deleteComment (token: string, commend_id: Number) {
    const headers = new Headers();
    headers.append('Authorization', `token ${token}`);
    return this.http
      .delete(`${this.API_URL}repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues/comments/${commend_id}`);
  }

  createReaction (token: string, content: string, comment_id: number) {
    const headers = new Headers();
    headers.append('Authorization', `token ${token}`);
    headers.append('Accept', 'application/vnd.github.squirrel-girl-preview');
    return this.http
      .post(`${this.API_URL}repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}
      /issues/comments/${comment_id}/reactions`, {content}, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json());
  }

  deleteReaction (token: string, reaction_id: number) {
    const headers = new Headers();
    headers.append('Authorization', `token ${token}`);
    return this.http
      .delete(`${this.API_URL}reactions/${reaction_id}`);
  }
}
