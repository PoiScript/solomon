import 'rxjs/add/operator/toPromise';
import { Component, Input, OnInit } from '@angular/core';

import { Comment, CommentService } from '../shared';

@Component({
  selector: 'solomon-comment-viewer',
  templateUrl: './comment-viewer.component.html',
  styleUrls: ['./comment-viewer.component.css']
})
export class CommentViewerComponent implements OnInit {
  @Input() slug: string;
  comments$: Promise<Comment[]>;

  constructor (private commentService: CommentService) { }

  ngOnInit (): void {
    this.comments$ = this.commentService.getComments(this.slug)
      .toPromise();
  }
}
