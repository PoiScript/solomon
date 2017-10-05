import { Component } from '@angular/core';

import { SnackBarService, UserService } from 'app/shared';

@Component({
  selector: 'solomon-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  constructor (private userService: UserService,
               private snackBarService: SnackBarService) { }

  logIn (email: string, password: string) {
    this.userService.signIn(email, password)
      .then(() => this.userService.navigate())
      .catch(err => this.snackBarService.open(err.error.message));
  }

  signUp (email: string, password: string, reenter: string) {
    if (password === reenter) {
      this.userService.signUp(email, password)
        .then(() => this.userService.navigate())
        .catch(err => this.snackBarService.open(err.error.message));
    }
  }
}
