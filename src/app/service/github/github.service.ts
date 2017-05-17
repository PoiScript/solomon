import {Inject, Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {SearchResult} from '../../class/searchResult';
import {CONFIG_TOKEN} from '../../../config';
import {SolomonConfig} from '../../interface/solomon-config';

@Injectable()
export class GitHubService {
  private GITHUB_USERNAME: string;
  private GITHUB_POST_REPO: string;
  private API_URL = 'https://api.github.com/';

  constructor (private http: Http,
               @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME;
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO;
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
}
