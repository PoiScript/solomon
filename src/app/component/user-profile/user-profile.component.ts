import {Component} from '@angular/core'
import {AngularFire, AuthMethods, AuthProviders, FirebaseAuthState} from 'angularfire2'
import {MdSnackBar} from '@angular/material'
import {TokenService} from '../../share/service/token'

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  isAuth: boolean = false
  user: FirebaseAuthState

  constructor(public af: AngularFire,
              private snackBar: MdSnackBar,
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
      console.log(res)
      if ('accessToken' in res.github) this.tokenService.setToken(res.github.accessToken)
      else this.snackBarOpen('Access Token Not Found, Re-login Please.', 1000)
    })
  }

  logout(): void {
    this.af.auth.logout()
      .then(() => this.snackBarOpen('Logout successfully', 1000))
  }

  private snackBarOpen(msg: string, duration: number) {
    this.snackBar.open(msg, '', {
      duration: duration
    })
  }

}
