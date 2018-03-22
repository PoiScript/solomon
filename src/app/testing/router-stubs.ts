import {
  Component,
  Directive,
  HostListener,
  Injectable,
  Input,
} from '@angular/core';
import { Data, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivatedRouteStub {
  private paramsSubject = new BehaviorSubject(this.testParams);
  // tslint:disable-next-line:member-ordering
  params = this.paramsSubject.asObservable();

  private _testParams: Params;

  get testParams() {
    return this._testParams;
  }

  set testParams(params: {}) {
    this.paramsSubject.next(params);
  }

  private dataSubject = new BehaviorSubject(this.testData);
  // tslint:disable-next-line:member-ordering
  data = this.dataSubject.asObservable();

  private _testData: Data;

  get testData() {
    return this._testData;
  }

  set testData(data: {}) {
    this.dataSubject.next(data);
  }

  get snapshot() {
    return {
      params: this.testParams,
      data: this.testData,
    };
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'router-outlet',
  template: '',
})
export class RouterOutletStubComponent {}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input() routerLink: string[] | string;
  navigatedTo: string[] | string = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.routerLink;
  }
}
