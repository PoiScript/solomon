import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from 'app/core';
import { User } from 'app/shared';
import { ProfileEditorComponent } from '../profile-editor/profile-editor.component';

@Component({
  selector: 'solomon-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  user: User;

  private sub: Subscription;

  constructor (private dialog: MatDialog,
               private userService: UserService) {
    this.sub = userService.user$.subscribe(user => this.user = user);
  }

  signOut () {
    this.userService.singOut();
  }

  sendVerificationEmail () {
    this.userService.sendVerificationEmail();
  }

  sendPasswordResetEmail () {
    this.userService.sendPasswordResetEmail();
  }

  openDialog (): void {
    const dialogRef = this.dialog.open(ProfileEditorComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe((user: { name: string, photo: string }) => {
      this.userService.updateUser(user.name, user.photo);
    });
  }

}
