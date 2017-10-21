import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivatedRouteStub {

  private paramsSubject = new BehaviorSubject(this.testParams);
  // tslint:disable-next-line:member-ordering
  params = this.paramsSubject.asObservable();

  private _testParams: Params;
  get testParams () { return this._testParams; }
  set testParams (params: {}) {
    this.paramsSubject.next(params);
  }

  get snapshot () {
    return {paramMap: this.testParams};
  }

}
