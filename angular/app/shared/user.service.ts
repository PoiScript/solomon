import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from 'app/shared';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  user$: Observable<User>;

  private baseUrl = environment.origin_url + 'api/auth';
  private headers = new Headers({'Content-Type': 'application/json'});
  // BehaviorSubject can return a value immediately to new subscribers
  private userSource: BehaviorSubject<User>;

  constructor (private http: Http,
               private router: Router) {
    // get data from local storage as initial value
    this.userSource = new BehaviorSubject(JSON.parse(localStorage.getItem('key:solomon:user')));
    this.user$ = this.userSource.asObservable();

    // subscribe user change, and store it into localStorage
    this.user$.subscribe(user => {
      if (user) {
        localStorage.setItem('key:solomon:user', JSON.stringify(user));
      }
    });
  }

  isAuth (): boolean {
    return !!this.userSource.getValue();
  }

  navigate () {
    this.router.navigate(['user']);
  }

  signIn (email: string, password: string): Promise<void> {
    return this.sendPostRequest('signIn', JSON.stringify({email, password}))
      .then(user => this.userSource.next(user));
  }

  signUp (email: string, password: string): Promise<void> {
    return this.sendPostRequest('signUp', JSON.stringify({email, password}))
      .then(user => this.userSource.next(user));
  }

  singOut () {
    this.userSource.next(null);
  }

  updateUser (displayName: string, photoUrl: string) {
    return this.sendPostRequest('updateUser', JSON.stringify({displayName, photoUrl, idToken: this.userSource.getValue().idToken}));
  }

  deleteUser () {
    return this.sendPostRequest('deleteUser', JSON.stringify({idToken: this.userSource.getValue().idToken}));
  }

  sendPasswordResetEmail () {
    return this.sendPostRequest('sendPasswordResetEmail', JSON.stringify({
      requestType: 'PASSWORD_RESET',
      email: this.userSource.getValue().email
    }));
  }

  verifyPasswordReset (oobCode: string) {
    return this.sendPostRequest('verifyPasswordReset', JSON.stringify({oobCode}));
  }

  confirmPasswordReset (oobCode: string, newPassword: string) {
    return this.sendPostRequest('confirmPasswordReset', JSON.stringify({oobCode, newPassword}));
  }

  sendVerificationEmail () {
    return this.sendPostRequest('sendVerificationEmail', JSON.stringify({
      requestType: 'VERIFY_EMAIL',
      idToken: this.userSource.getValue().idToken
    }));
  }

  confirmEmailVerification (oobCode: string) {
    return this.sendPostRequest('confirmEmailVerification', JSON.stringify({oobCode}));
  }

  private sendPostRequest (endpoint: string, body: string): Promise<any> {
    return this.http
      .post(`${this.baseUrl}/${endpoint}`, body, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(err => err.json());
  }
}
