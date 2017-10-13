import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/core';

import { APP_CONFIG } from 'app/app.config';
import { SOLOMON_CONFIG } from '../../solomon.conf';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'solomon'}),
    BrowserAnimationsModule,
    CoreModule,
    HttpModule,
    PagesModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: APP_CONFIG, useValue: SOLOMON_CONFIG}
  ]
})
export class AppModule {}
