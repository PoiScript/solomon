import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';
import { Component, Input, OnInit } from '@angular/core';

import { CommentResponse } from './comment.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'solomon-comment-viewer',
  templateUrl: './comment-viewer.component.html',
  styleUrls: ['./comment-viewer.component.css']
})
export class CommentViewerComponent implements OnInit {
  @Input() slug: string;
  response$: Promise<CommentResponse>;

  constructor (private http: Http) { }

  ngOnInit (): void {
    this.response$ = this.http.get(`${environment.origin_url}api/comment/${this.slug}`)
      .toPromise()
      .then(res => res.json().data as CommentResponse);
  }
}
