import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';
import { UserInfo } from 'firebase';
import { Error } from 'firebase/auth';

import { UserService } from '../user.service';

@Component({
  selector: 'solomon-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnDestroy {
  sub: Subscription;
  user: UserInfo;

  constructor (private userService: UserService,
               private snackBar: MdSnackBar) {
    this.sub = userService.user$.subscribe(user => this.user = user);
  }

  googleSignIn () {
    this.userService.googleSignIn()
      .then((result: { user: UserInfo }) => this.openSnackBar(`Logged in as ${result.user.displayName}`))
      .catch((error: Error) => this.openSnackBar(`Unfortunately, login failed. Error code: ${error.code}`));
  }

  githubSignIn () {
    this.userService.githubSignIn()
      .then((result: { user: UserInfo }) => this.openSnackBar(`Logged in as ${result.user.displayName}`))
      .catch((error: Error) => this.openSnackBar(`Unfortunately, login failed. Error code: ${error.code}`));
  }

  updateProfile (displayName: string, photoURL: string) {
    this.userService.updateProfile(displayName, photoURL)
      .then(() => this.openSnackBar('User profile updated.'))
      .catch((error: Error) => this.openSnackBar(`Unfortunately, update failed. Error code: ${error.code}`));
  }

  signOut () {
    this.userService.signOut()
      .then(() => this.openSnackBar('Signed out.'))
      .catch((error: Error) => this.openSnackBar(`Unfortunately, sign out failed. Error code: ${error.code}`));
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }

  private openSnackBar (message: string) {
    this.snackBar.open(message, null, {duration: 2000});
  }
}
