import { Component, Input } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { UserInfo } from 'firebase';

import { CommentService } from '../shared';
import { UserService, UserProfileComponent } from 'app/shared';

@Component({
  selector: 'solomon-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent {
  @Input() slug: string;
  user: UserInfo;

  constructor (private dialog: MdDialog,
               private snackBar: MdSnackBar,
               private userService: UserService,
               private commentService: CommentService) {
    userService.user$.subscribe(user => this.user = user);
  }

  openDialog() {
    this.dialog.open(UserProfileComponent);
  }

  submit (content: string) {
    if (this.user) {
      this.commentService.createComment(this.slug, this.user.uid, content)
        .subscribe(() => this.openSnackBar('Comment posted successfully.'));
    } else {
      this.openSnackBar('Logged In First!');
    }
  }

  private openSnackBar (message: string) {
    this.snackBar.open(message, null, {duration: 2000});
  }
}
