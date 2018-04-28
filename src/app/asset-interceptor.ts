// tslint:disable:no-any

declare var require: any;

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

@Injectable()
export class AssetInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    for (const dir of ['src', 'public']) {
      const path = join(dir, req.url);
      if (existsSync(path)) {
        return of(
          new HttpResponse<any>({
            body: readFileSync(path).toString(),
            status: 200,
            statusText: 'OK',
            url: req.url,
          }),
        );
      }
    }

    return of(
      new HttpResponse<any>({
        body: '',
        status: 404,
        statusText: 'Not Found',
        url: req.url,
      }),
    );
  }
}
