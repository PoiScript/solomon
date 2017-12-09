import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/core';
import { PagesModule } from 'app/pages';
import { SharedModule } from 'app/shared';

import { APP_CONFIG } from 'app/app.config';
import SOLOMON_CONFIG from '../../solomon.conf';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'solomon'}),
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
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
