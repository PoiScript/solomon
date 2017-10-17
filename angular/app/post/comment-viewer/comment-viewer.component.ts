import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnChanges, PLATFORM_ID } from '@angular/core';
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

  constructor (private commentService: CommentService,
               @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnChanges (): void {
    if (isPlatformBrowser(this.platformId)) {
      this.comments$ = this.commentService.getComments(this.slug);
    }
  }

}
