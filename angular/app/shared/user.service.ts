import { Injectable } from '@angular/core';
import { auth, User, Promise } from 'firebase';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  // BehaviorSubject can return a value immediately to new subscribers
  private userSource = new BehaviorSubject<User>(null);
  user$ = this.userSource.asObservable();

  constructor () {
    auth().onAuthStateChanged(
      (user: User) => this.userSource.next(user),
      (error: auth.Error) => this.userSource.error(error),
      () => {
        this.userSource.complete();
        return undefined;
      }
    );
  }

  googleSignIn (): Promise<any> {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
  }

  githubSignIn (): Promise<any> {
    const provider = new auth.GithubAuthProvider();
    return auth().signInWithPopup(provider);
  }

  signOut (): Promise<void> {
    return auth().signOut();
  }

  updateProfile (displayName: string, photoURL: string): Promise<void> {
    const user = this.userSource.getValue();
    return user.updateProfile({displayName, photoURL});
  }
}
