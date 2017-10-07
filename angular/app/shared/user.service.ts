import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/shared';
import { environment } from 'environments/environment';

@Injectable()
export class UserService {
  user$: Observable<User>;

  private baseUrl = environment.origin_url + 'api/auth/';
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

  signIn (email: string, password: string) {
    return this.request('signIn', {email, password})
      .then(user => this.userSource.next(user));
  }

  signUp (email: string, password: string) {
    return this.request('signUp', {email, password})
      .then(user => this.userSource.next(user));
  }

  singOut () {
    // set current user to null
    this.userSource.next(null);
    // clear all cached data
    localStorage.clear();
  }

  updateUser (displayName: string, photoUrl: string) {
    const idToken = this.userSource.getValue().idToken;
    return this.request('updateUser', {displayName, photoUrl, idToken})
      .then(user =>
        // update user properties
        this.userSource.next({...this.userSource.getValue(), ...user})
      );
  }

  deleteUser () {
    const idToken = this.userSource.getValue().idToken;
    return this.request('deleteUser', {idToken});
  }

  sendPasswordResetEmail () {
    const email = this.userSource.getValue().email;
    const requestType = 'PASSWORD_RESET';
    return this.request('sendPasswordResetEmail', {requestType, email});
  }

  verifyPasswordReset (oobCode: string) {
    return this.request('verifyPasswordReset', {oobCode});
  }

  confirmPasswordReset (oobCode: string, newPassword: string) {
    return this.request('confirmPasswordReset', {oobCode, newPassword});
  }

  sendVerificationEmail () {
    const idToken = this.userSource.getValue().idToken;
    const requestType = 'VERIFY_EMAIL';
    return this.request('sendVerificationEmail', {requestType, idToken});
  }

  confirmEmailVerification (oobCode: string) {
    return this.request('confirmEmailVerification', {oobCode});
  }

  private request (endpoint: string, body: any): Promise<any> {
    const json = JSON.stringify(body);
    return this.http
      .post(this.baseUrl + endpoint, json, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      // rethrow parsed error
      .catch(err => Promise.reject(err.json()));
  }
}
