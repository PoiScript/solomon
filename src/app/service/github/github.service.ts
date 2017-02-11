import {Inject, Injectable} from "@angular/core"
import {Headers, Http} from "@angular/http"
import {Repo} from "../../classes/Repo"
import {Comment} from "../../classes/Comment"
import {SearchResult} from "../../classes/SearchResult"
import {CONFIG_TOKEN} from "../../config"
import {SolomonConfig} from "../../interface/solomon-config"

@Injectable()
export class GitHubService {
  private GITHUB_USERNAME: string
  private GITHUB_POST_REPO: string

  constructor(private http: Http,
              @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
  }

  getRepos(): Promise<Repo[]> {
    return this.http.get(`https://api.github.com/users/${this.GITHUB_USERNAME}/repos?type=all&sort=pushed`)
      .toPromise()
      .then(res => res.json() as Repo[])
  }

  getIssueComments(number: Number): Promise<Comment[]> {
    let headers = new Headers()
    headers.append('Accept', 'application/vnd.github.squirrel-girl-preview')
    return this.http.get(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/issues/${number}/comments`, {
      headers: headers
    }).toPromise()
      .then(res => res.json() as Comment[])
  }

  searchCode(keyword: string): Promise<SearchResult> {
    let headers = new Headers()
    headers.append('Accept', 'application/vnd.github.v3.text-match+json')
    return this.http.get(`https://api.github.com/search/code?q=repo:${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}+extension:md+${keyword}`, {
      headers: headers
    }).toPromise()
      .then(res => res.json() as SearchResult)
  }
}
