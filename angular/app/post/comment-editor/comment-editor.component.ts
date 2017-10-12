import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SnackBarService, UserService } from 'app/core';
import { User } from 'app/shared';
import { CommentService } from 'app/post/shared';

@Component({
  selector: 'solomon-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent implements OnDestroy {

  @Input() slug: string;
  user: User;

  private sub: Subscription;

  constructor (private userService: UserService,
               private snackBarService: SnackBarService,
               private commentService: CommentService) {
    this.sub = userService.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }

  navigate () {
    this.userService.navigate();
  }

  submit (content: string) {
    if (this.user) {
      this.commentService.createComment(this.slug, this.user.localId, content)
        .subscribe(() => this.snackBarService.open('Comment posted successfully.'));
    } else {
      this.snackBarService.open('Logged In First!');
    }
  }

}
