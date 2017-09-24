import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CommentResponse } from './comment.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'solomon-comment-viewer',
  templateUrl: './comment-viewer.component.html',
  styleUrls: ['./comment-viewer.component.css']
})
export class CommentViewerComponent implements OnInit {
  @Input() slug: string;
  response$: Observable<CommentResponse>;

  constructor (private http: HttpClient) { }

  ngOnInit (): void {
    this.response$ = this.http.get<CommentResponse>(`${environment.origin_url}api/comment/${this.slug}`);
    // .subscribe(data => this.comments = data.results);
  }
}
