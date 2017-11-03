import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Error as ApiError, User } from 'app/shared';
import { environment } from 'environments/environment';

import { LoadingService } from './loading.service';
import { SnackBarService } from './snack-bar.service';

@Injectable()
export class UserService {

  user$: Observable<User>;

  private baseUrl = environment.origin_url + 'api/auth/';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  // can't access browser types when pre-render
  private isBrowser: boolean;
  // BehaviorSubject can return a value immediately to new subscribers
  private userSource: BehaviorSubject<User>;

  constructor (private http: HttpClient,
               private router: Router,
               private loadingService: LoadingService,
               private snackBarService: SnackBarService,
               @Inject(PLATFORM_ID) private platformId: Object) {
    // get data from local storage as initial value
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.userSource = new BehaviorSubject(JSON.parse(localStorage.getItem('key:solomon:user')));
    } else {
      this.userSource = new BehaviorSubject(null);
    }
    this.user$ = this.userSource.asObservable();

    // subscribe user change, and store it into localStorage
    this.user$.subscribe(user => {
      if (this.isBrowser && user) {
        localStorage.setItem('key:solomon:user', JSON.stringify(user));
      }
    });
  }

  isAuth (): boolean {
    return !!this.userSource.getValue();
  }

  // TODO: merge auth-guard service into user service?
  navigate () {
    this.router.navigate(['user']);
  }

  signIn (email: string, password: string) {
    this.request('signIn', {email, password})
      .subscribe(
        user => {
          this.userSource.next(user);
          this.navigate();
        },
        this.handleError,
        this.hideLoading
      );
  }

  signUp (email: string, password: string) {
    this.request('signUp', {email, password})
      .subscribe(
        user => {
          this.userSource.next(user);
          this.navigate();
        },
        this.handleError,
        this.hideLoading
      );
  }

  singOut () {
    // navigate back to login screen, stop element binding for user object
    this.router.navigate(['user/login'])
      .then(() => {
        // then, set user to null will not causes property undefined error
        this.userSource.next(null);
        // clear cache
        if (this.isBrowser) {
          localStorage.clear();
        }
      });
  }

  updateUser (displayName: string, photoUrl: string) {
    const oldUser = this.userSource.getValue();
    return this.request('updateUser', {displayName, photoUrl, idToken: oldUser.idToken})
      .subscribe(
        newUser => this.userSource.next({...oldUser, ...newUser}),
        this.handleError,
        this.hideLoading
      );
  }

  deleteUser () {
    const idToken = this.userSource.getValue().idToken;
    return this.request('deleteUser', {idToken});
  }

  sendPasswordResetEmail () {
    const {email} = this.userSource.getValue();
    this.request('sendPasswordResetEmail', {requestType: 'PASSWORD_RESET', email})
      .subscribe(
        () => this.snackBarService.open('Password Reset Email sent.'),
        this.handleError,
        this.hideLoading
      );
  }

  verifyPasswordReset (oobCode: string) {
    return this.request('verifyPasswordReset', {oobCode});
  }

  confirmPasswordReset (oobCode: string, newPassword: string) {
    return this.request('confirmPasswordReset', {oobCode, newPassword});
  }

  sendVerificationEmail () {
    const idToken = this.userSource.getValue().idToken;
    this.request('sendVerificationEmail', {requestType: 'VERIFY_EMAIL', idToken})
      .subscribe(
        () => this.snackBarService.open('Verification email sent.'),
        this.handleError,
        this.hideLoading
      );
  }

  confirmEmailVerification (oobCode: string) {
    return this.request('confirmEmailVerification', {oobCode});
  }

  private hideLoading = () => this.loadingService.hide();

  private handleError (err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      this.snackBarService.open(`An error occurred: ${err.error.message}`);
    } else if (err.error instanceof ApiError) {
      this.snackBarService.open(`An error occurred, code: ${err.error.code} message: ${err.error.message}`);
    }
  }

  private request (endpoint: string, body: any): Observable<any> {
    this.loadingService.show();
    const json = JSON.stringify(body);
    return this.http.post(this.baseUrl + endpoint, json, {headers: this.headers});
  }

}
