import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {SearchResult} from '../../class/searchResult';

@Injectable()
export class GitHubService {
  constructor (private http: Http) {}

  searchCode (keyword: string): Promise<SearchResult> {
    const headers = new Headers();
    headers.append('Accept', 'application/vnd.github.v3.text-match+json');
    return this.http
      .get(`https://api.github.com/search/code?q=repo:PoiScript/Solomon-Post+extension:md+${keyword}`, {
        headers: headers
      })
      .toPromise()
      .then(res => res.json() as SearchResult);
  }
}
