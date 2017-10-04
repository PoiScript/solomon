import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from 'app/shared';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor (public userService: UserService, public router: Router) {}

  canActivate (): boolean {
    if (this.userService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['user/login']);
      return false;
    }
  }
}
