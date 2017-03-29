import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TokenService {
  private token: string;

  private tokenSource = new Subject<string>();

  token$ = this.tokenSource.asObservable();

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    this.tokenSource.next(token);
  }
}
