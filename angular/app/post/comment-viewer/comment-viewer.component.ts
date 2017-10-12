import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Comment, CommentService } from '../shared';

@Component({
  selector: 'solomon-comment-viewer',
  templateUrl: './comment-viewer.component.html',
  styleUrls: ['./comment-viewer.component.css']
})
export class CommentViewerComponent implements OnChanges {

  @Input() slug: string;
  comments$: Observable<Comment[]>;

  constructor (private commentService: CommentService) { }

  ngOnChanges (): void {
    this.comments$ = this.commentService.getComments(this.slug);
  }

}
