import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/core';
import { PagesModule } from 'app/pages';
import { SharedModule } from 'app/shared';

import { APP_CONFIG } from 'app/app.config';
import SOLOMON_CONFIG from '../../solomon.conf';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'solomon'}),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    PagesModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: SOLOMON_CONFIG
    }
  ]
})
export class AppModule {}
