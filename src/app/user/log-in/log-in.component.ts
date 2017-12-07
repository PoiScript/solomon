import { Component } from '@angular/core';

import { UserService } from 'app/core';

@Component({
  selector: 'solomon-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  constructor (private userService: UserService) { }

  logIn (email: string, password: string) {
    this.userService.signIn(email, password);
  }

  signUp (email: string, password: string, reenter: string) {
    if (password === reenter) {
      this.userService.signUp(email, password);
    }
  }

}
