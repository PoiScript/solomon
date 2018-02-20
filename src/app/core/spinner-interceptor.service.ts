// tslint:disable:no-any

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { SpinnerService } from './spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor (private spinnerService: SpinnerService) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next.handle(req).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        this.spinnerService.hide();
      }
    }));
  }

}
