// tslint:disable:no-any

declare const __dirname: string;

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';
import { readFileSync, existsSync, readJsonSync } from 'fs-extra';
import { resolve } from 'path';

@Injectable()
export class AssetInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const path = resolve(__dirname, '../../../assets', req.url.slice(1));
    if (existsSync(path)) {
      return observableOf(
        new HttpResponse<any>({
          body: path.endsWith('.json')
            ? readJsonSync(path)
            : readFileSync(path).toString(),
          status: 200,
          statusText: 'OK',
          url: req.url,
        }),
      );
    } else {
      return observableOf(
        new HttpResponse<any>({
          body: '',
          status: 404,
          statusText: 'Not Found',
          url: req.url,
        }),
      );
    }
  }
}
