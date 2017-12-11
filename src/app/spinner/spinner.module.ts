import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from 'app/shared';

import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';
import { SpinnerInterceptor } from './spinner-interceptor.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SpinnerComponent
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [
    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }
  ]
})
export class SpinnerModule { }
