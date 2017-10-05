import { Component, Input } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { User, UserService } from 'app/shared';
import { CommentService } from 'app/post/shared';

@Component({
  selector: 'solomon-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent {
  @Input() slug: string;
  sub: Subscription;
  user: User;

  constructor (private snackBar: MdSnackBar,
               private userService: UserService,
               private commentService: CommentService) {
    this.sub = userService.user$.subscribe(user => this.user = user);
  }

  navigate () {
    this.userService.navigate();
  }

  submit (content: string) {
    if (this.user) {
      this.commentService.createComment(this.slug, this.user.localId, content)
        .subscribe(() => this.openSnackBar('Comment posted successfully.'));
    } else {
      this.openSnackBar('Logged In First!');
    }
  }

  private openSnackBar (message: string) {
    this.snackBar.open(message, null, {duration: 2000});
  }
}
