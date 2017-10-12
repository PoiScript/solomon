import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {

  private statusSource = new Subject<boolean>();

  // tslint:disable-next-line:member-ordering
  status$: Observable<boolean> = this.statusSource.asObservable();

  show () {
    this.statusSource.next(true);
  }

  hide () {
    this.statusSource.next(false);
  }

}
