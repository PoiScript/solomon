import { NgModule } from '@angular/core';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';

import { AppModule } from 'app/app.module';
import { AppComponent } from 'app/app.component';

@NgModule({
  imports: [
    AppModule,
    FlexLayoutServerModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
