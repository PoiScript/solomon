import {Injectable} from "@angular/core"
import {BehaviorSubject} from "rxjs/BehaviorSubject"

@Injectable()
export class ScrollService {
  public window = new BehaviorSubject(null);

  constructor() {
    window.onscroll = (e) => {
      this.window.next(e.target)
    }
  }
}
