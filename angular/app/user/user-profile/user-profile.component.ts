import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { User, UserService } from 'app/shared';
import { ProfileEditorComponent } from '../profile-editor/profile-editor.component';

@Component({
  selector: 'solomon-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  sub: Subscription;
  user: User;

  constructor (private dialog: MdDialog,
               private userService: UserService) {
    this.sub = userService.user$.subscribe(user => this.user = user);
  }

  signOut () {
    this.userService.navigate();
    this.userService.singOut();
  }

  openDialog (): void {
    const dialogRef = this.dialog.open(ProfileEditorComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe((user: { name: string, photo: string }) => {
      this.userService.updateUser(user.name, user.photo);
      console.log(user);
    });
  }
}
