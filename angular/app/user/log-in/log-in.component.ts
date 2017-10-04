import 'rxjs/add/operator/toPromise';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SnackBarService, UserService } from 'app/shared';

@Component({
  selector: 'solomon-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  constructor (private router: Router,
               private userService: UserService,
               private snackBarService: SnackBarService) { }

  logIn (email: string, password: string) {
    this.userService.signIn(email, password)
      .then(() => this.router.navigate((['user'])))
      .catch(err => {
        console.error(err);
        this.snackBarService.open(err.error.message);
      });
  }

  signUp (email: string, password: string, reenter: string) {
    if (password === reenter) {
      this.userService.signUp(email, password)
        .then(() => this.router.navigate((['user'])))
        .catch(err => {
          console.error(err);
          this.snackBarService.open(err.error.message);
        });
    }
  }
}
