import {Component} from '@angular/core'
import {AngularFire, AuthMethods, AuthProviders, FirebaseAuthState} from 'angularfire2'
import {TokenService} from '../../service/token'
import {SnackBarService} from '../../service/snackbar'

@Component({
  selector: 'solomon-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  isAuth: boolean = false
  user: FirebaseAuthState

  constructor(public af: AngularFire,
              private snackBarService: SnackBarService,
              private tokenService: TokenService) {
    this.af.auth.subscribe(
      user => {
        if (user) {
          this.isAuth = true
          this.user = user
        } else {
          this.isAuth = false
        }
      },
      error => console.trace(error)
    )
  }

  login(): void {
    this.af.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Popup,
      scope: ['public_repo']
    }).then((res: any) => {
      if ('accessToken' in res.github) this.tokenService.setToken(res.github.accessToken)
      else this.snackBarService.openSnackBar('Access Token Not Found, Re-login Please.')
    })
  }

  logout(): void {
    this.af.auth.logout()
      .then(() => this.snackBarService.openSnackBar('Logout successfully'))
  }

}
