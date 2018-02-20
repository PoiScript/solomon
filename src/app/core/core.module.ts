import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { SpinnerService } from './spinner.service';
import { SpinnerInterceptor } from './spinner-interceptor.service';

@NgModule({
  providers: [
    Title,
    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
