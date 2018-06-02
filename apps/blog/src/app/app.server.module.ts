import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AssetInterceptor } from './asset-interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AssetInterceptor,
      multi: true,
    },
  ],
})
export class AppServerModule {}
