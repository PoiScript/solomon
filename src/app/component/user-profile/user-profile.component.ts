import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {TokenService} from '../../service/token';
import {SnackBarService} from '../../service/snackbar';
import {Observable} from 'rxjs/Observable';
import {User, auth} from 'firebase/app';

@Component({
  selector: 'solomon-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  isAuth = false;
  user: Observable<User>;

  constructor (public afAuth: AngularFireAuth,
               private snackBarService: SnackBarService,
               private tokenService: TokenService) {
    this.user = afAuth.authState;
  }

  login (): void {
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider())
      .then((res: any) => {
        if ('accessToken' in res.github) {
          this.tokenService.setToken(res.github.accessToken);
        } else {
          this.snackBarService.openSnackBar('Access Token Not Found, Re-login Please.');
        }
      });
  }

  logout (): void {
    this.afAuth.auth.signOut()
      .then(() => this.snackBarService.openSnackBar('Logout successfully'));
  }

}
