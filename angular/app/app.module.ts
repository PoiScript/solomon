import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/core';
import { SharedModule } from 'app/shared';

import { APP_CONFIG } from 'app/app.config';
import { SOLOMON_CONFIG } from '../../solomon.conf';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'solomon'}),
    CoreModule,
    SharedModule,
    HttpModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    Title,
    {provide: APP_CONFIG, useValue: SOLOMON_CONFIG}
  ]
})
export class AppModule {}
