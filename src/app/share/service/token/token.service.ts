import {Injectable} from "@angular/core"

@Injectable()
export class TokenService {
  private token: string

  getToken(): string {
    return this.token
  }

  setToken(token: string): void {
    this.token = token
  }
}
