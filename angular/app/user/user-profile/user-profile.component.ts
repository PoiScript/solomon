import { Component } from '@angular/core';
import {  Observable } from 'rxjs/Observable';

import { User, UserService } from 'app/shared';

@Component({
  selector: 'solomon-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user$: Observable<User>;

  constructor (userService: UserService) {
    this.user$ = userService.user$;
  }
}
